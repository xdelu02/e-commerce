<?php
	class Cliente {
		// connessione al db e nome tabella
		private $conn;
		private $table_name = "clienti";

		// proprietà
		public $idCliente;
		public $nome;
		public $cognome;
		public $dataN;

		// costruttore
		public function __construct($db){
			$this->conn = $db;
		}

		// read
		function read() {
			// select all query
			$query = "SELECT
						idCliente, nome, cognome, dataN
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
						idCliente, nome, cognome, dataN
					FROM
						" . $this->table_name . " c
					WHERE
						c.idCliente = ?
					LIMIT
						0,1";

			$stmt = $this->conn->prepare( $query );
			$stmt->bindParam(1, $this->idCliente);

			$stmt->execute();
			while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
				// set values to object properties
				$this->idCliente = $row['idCliente'];
				$this->nome = $row['nome'];
				$this->cognome = $row['cognome'];
				$this->dataN = $row['dataN'];

				break;
			}
		}

		// create
		function create() {
			// query insert
			$query = "INSERT INTO
						" . $this->table_name . "
					SET
						idCliente=:idCliente, nome=:nome, cognome=:cognome, dataN=:dataN";

			$stmt = $this->conn->prepare($query);
		
			// sanitize
			$this->idCliente=htmlspecialchars(strip_tags($this->idCliente));
			$this->nome=htmlspecialchars(strip_tags($this->nome));
			$this->cognome=htmlspecialchars(strip_tags($this->cognome));
			$this->dataN=htmlspecialchars(strip_tags($this->dataN));
		
			// bind params
			$stmt->bindParam(":idCliente", $this->idCliente);
			$stmt->bindParam(":nome", $this->nome);
			$stmt->bindParam(":cognome", $this->cognome);
			$stmt->bindParam(":dataN", $this->dataN);

			if($stmt->execute())
				return true;
			
			return false;
		}

		// delete
		function delete() {
			// delete query
			$query = "DELETE FROM " . $this->table_name . " WHERE idCliente = ?";
		
			// prepare query
			$stmt = $this->conn->prepare($query);
		
			// sanitize
			$this->idCliente=htmlspecialchars(strip_tags($this->idCliente));
		
			// bind id
			$stmt->bindParam(1, $this->idCliente);
		
			if($stmt->execute())
				return true;
		
			return false;
		}

		// update
		function update() {
			// update query
			$query = "UPDATE
						" . $this->table_name . "
					SET
						nome=:nome, cognome=:cognome, dataN=:dataN
					WHERE
						idCliente=:idCliente";

			$stmt = $this->conn->prepare($query);
		
			// sanitize
			$this->idCliente=htmlspecialchars(strip_tags($this->idCliente));
			$this->nome=htmlspecialchars(strip_tags($this->nome));
			$this->cognome=htmlspecialchars(strip_tags($this->cognome));
			$this->dataN=htmlspecialchars(strip_tags($this->dataN));
		
			// bind params
			$stmt->bindParam(":idCliente", $this->idCliente);
			$stmt->bindParam(":nome", $this->nome);
			$stmt->bindParam(":cognome", $this->cognome);
			$stmt->bindParam(":dataN", $this->dataN);
		
			if($stmt->execute())
				return true;
		
			return false;
		}
	}
?>