<?php
	class Carrello {
		// connessione al db e nome tabella
		private $conn;
		private $table_name = "Ordini";

		// proprietà
		public $idOrdine;
		public $idCliente;
		public $indirizzo;
		public $codice;
		public $idPagamento;
		public $importo;

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
		
		// read email
		function readEmail() {
			// query to read single record
			$query = "SELECT
						idOrdine, idCliente, codice
					FROM
						" . $this->table_name . "
					WHERE
						idCliente = ? AND
						idPagamento IS NULL";

			$stmt = $this->conn->prepare( $query );
			$stmt->bindParam(1, $this->idCliente);

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
						idCliente=:idCliente, codice=:codice";

			$stmt = $this->conn->prepare($query);
		
			// sanitize
			$this->idCliente=htmlspecialchars(strip_tags($this->idCliente));
			$this->codice=htmlspecialchars(strip_tags($this->codice));
		
			// bind params
			$stmt->bindParam(":idCliente", $this->idCliente);
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

		// update
		function update() {
			$stmt = $this->readEmail();
			$num = $stmt->rowCount();

			if($num != 1) {
				return false;
			}
			
			// query for code
			$stmt1 = $this->read();
			$cli = "";
			$ind = "";
			$id = "";
			while ($row1 = $stmt1->fetch(PDO::FETCH_ASSOC)) {
				$cli = $row1['idCliente'];
				$ind = $row1['indirizzo'];
				$id = $row1['codice'];
			}
			$this->idPagamento = hash("crc32b","pag:".$cli.$ind.$id);

			//generate payment
			$q = "INSERT INTO Pagamenti VALUES (?, ?)";
			// prepare query
			$stmt2 = $this->conn->prepare($q);
			// sanitize
			$this->idPagamento=htmlspecialchars(strip_tags($this->idPagamento));
			$this->importo=htmlspecialchars(strip_tags($this->importo));
			// bind id
			$stmt2->bindParam(1, $this->idPagamento);
			$stmt2->bindParam(2, $this->importo);
			//exec
			$stmt2->execute();

			// query for code
			$stmt3 = $this->readEmail();
			while ($row2 = $stmt3->fetch(PDO::FETCH_ASSOC)) {
				$this->codice = $row2['codice'];
			}

			// update query
			$query = "UPDATE
						" . $this->table_name . "
					SET
						idPagamento=:idPagamento,
						indirizzo=:indirizzo
					WHERE
						codice=:codice";

			$stmt4 = $this->conn->prepare($query);
		
			// sanitize
			$this->idPagamento=htmlspecialchars(strip_tags($this->idPagamento));
			$this->codice=htmlspecialchars(strip_tags($this->codice));
			$this->indirizzo=htmlspecialchars(strip_tags($this->indirizzo));
		
			// bind params
			$stmt4->bindParam(":idPagamento", $this->idPagamento);
			$stmt4->bindParam(":codice", $this->codice);
			$stmt4->bindParam(":indirizzo", $this->indirizzo);
		
			if($stmt4->execute())
				return true;
		
			return false;
		}
	}
?>