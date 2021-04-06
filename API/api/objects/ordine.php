<?php
	class Ordine {
		// connessione al db e nome tabella
		private $conn;
		private $table_name = "ordini";

		// proprietà
		public $idOrdine;
		public $idCliente;
		public $indirizzo;
		public $codice;

		// costruttore
		public function __construct($db){
			$this->conn = $db;
		}

		// read
		function read() {
			// select all query
			$query = "SELECT
						idOrdine, idCliente, indirizzo, codice
					FROM
						" . $this->table_name;
		
			$stmt = $this->conn->prepare($query);
			$stmt->execute();
		
			return $stmt;
		}
		
		// read one
		function readOne() {
			// query to read single record
			$query = "SELECT
						idOrdine, idCliente, indirizzo, codice
					FROM
						" . $this->table_name . " o
					WHERE
						o.idOrdine = ?
					LIMIT
						1";

			$stmt = $this->conn->prepare( $query );
			$stmt->bindParam(1, $this->idOrdine);

			$stmt->execute();
			while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$this->idOrdine = $row['idOrdine'];
				$this->idCliente = $row['idCliente'];
				$this->indirizzo = $row['indirizzo'];
				$this->codice = $row['codice'];
				
				break;
			}
		}

		// read by Cliente
		function readCli() {
			// select all query
			$query = "SELECT
						idOrdine, idCliente, indirizzo, codice
					FROM
						" . $this->table_name . " o
					WHERE
						o.idCliente = ?";
		
			$stmt = $this->conn->prepare($query);
			$stmt->bindParam(1, $this->idCliente);

			$stmt->execute();
		
			return $stmt;
		}

		// read by Codice
		function readCode() {
			// select all query
			$query = "SELECT
						idOrdine, idCliente, indirizzo, codice
					FROM
						" . $this->table_name . " o
					WHERE
						o.codice = ?
					LIMIT
						1";
		
			$stmt = $this->conn->prepare($query);
			$stmt->bindParam(1, $this->codice);

			$stmt->execute();
		
			return $stmt;
		}

		// create
		function create() {
			// query for code
			$s = $this->read();
			$cli = "";
			$ind = "";
			$id = "";
			while ($r = $s->fetch(PDO::FETCH_ASSOC)) {
				$cli = $r['idCliente'];
				$ind = $r['indirizzo'];
				$id = $r['codice'];
			}
			$this->codice = hash("crc32b","ord:".$cli.$ind.$id);

			// query insert
			$query = "INSERT INTO
						" . $this->table_name . "
					SET
                        idCliente=:idCliente, indirizzo=:indirizzo, codice=:codice";

			$stmt = $this->conn->prepare($query);
		
			// sanitize
			$this->idCliente=htmlspecialchars(strip_tags($this->idCliente));
			$this->indirizzo=htmlspecialchars(strip_tags($this->indirizzo));
			$this->codice=htmlspecialchars(strip_tags($this->codice));
		
			// bind params
			$stmt->bindParam(":idCliente", $this->idCliente);
			$stmt->bindParam(":indirizzo", $this->indirizzo);
			$stmt->bindParam(":codice", $this->codice);

			if($stmt->execute())
				return true;
			
			return false;
		}

		// delete
		function delete() {
			// delete query
			$query = "DELETE FROM " . $this->table_name . " WHERE idOrdine = ?";
		
			// prepare query
			$stmt = $this->conn->prepare($query);
		
			// sanitize
			$this->idOrdine=htmlspecialchars(strip_tags($this->idOrdine));
		
			// bind id
			$stmt->bindParam(1, $this->idOrdine);
		
			if($stmt->execute())
				return true;
		
			return false;
		}
	}
?>