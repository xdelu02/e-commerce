<?php
	class Cliente {
		// connessione al db e nome tabella
		private $conn;
		private $table_name = "clienti";

		// proprietà
		public $email;
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
						email, nome, cognome, dataN
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
						email, nome, cognome, dataN
					FROM
						" . $this->table_name . " c
					WHERE
						c.email = ?
					LIMIT
						0,1";

			$stmt = $this->conn->prepare( $query );
			$stmt->bindParam(1, $this->email);

			$stmt->execute();
			while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
				// set values to object properties
				$this->email = $row['email'];
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
						email=:email, nome=:nome, cognome=:cognome, dataN=:dataN";

			$stmt = $this->conn->prepare($query);
		
			// sanitize
			$this->email=htmlspecialchars(strip_tags($this->email));
			$this->nome=htmlspecialchars(strip_tags($this->nome));
			$this->cognome=htmlspecialchars(strip_tags($this->cognome));
			$this->dataN=htmlspecialchars(strip_tags($this->dataN));
		
			// bind params
			$stmt->bindParam(":email", $this->email);
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
			$query = "DELETE FROM " . $this->table_name . " WHERE email = ?";
		
			// prepare query
			$stmt = $this->conn->prepare($query);
		
			// sanitize
			$this->email=htmlspecialchars(strip_tags($this->email));
		
			// bind id
			$stmt->bindParam(1, $this->email);
		
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
						email=:email";

			$stmt = $this->conn->prepare($query);
		
			// sanitize
			$this->email=htmlspecialchars(strip_tags($this->email));
			$this->nome=htmlspecialchars(strip_tags($this->nome));
			$this->cognome=htmlspecialchars(strip_tags($this->cognome));
			$this->dataN=htmlspecialchars(strip_tags($this->dataN));
		
			// bind params
			$stmt->bindParam(":email", $this->email);
			$stmt->bindParam(":nome", $this->nome);
			$stmt->bindParam(":cognome", $this->cognome);
			$stmt->bindParam(":dataN", $this->dataN);
		
			if($stmt->execute())
				return true;
		
			return false;
		}
	}
?>