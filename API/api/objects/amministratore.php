<?php
	class Amministratore {
		// connessione al db e nome tabella
		private $conn;
		private $table_name = "amministratori";

		// proprietà
		public $idAdmin;
		public $nome;
		public $cognome;
		public $email;
		public $username;
		public $password;

		// costruttore
		public function __construct($db){
			$this->conn = $db;
		}

		// read
		function read() {
			// select all query
			$query = "SELECT
						idAdmin, nome, cognome, username, email, password
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
						idAdmin, nome, cognome, username, email, password
					FROM
						" . $this->table_name . " a
					WHERE
						a.idAdmin = ?
					LIMIT
						1";

			$stmt = $this->conn->prepare( $query );
			$stmt->bindParam(1, $this->idAdmin);

			$stmt->execute();
			while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$this->idAdmin = $row['idAdmin'];
				$this->nome = $row['nome'];
				$this->cognome = $row['cognome'];
				$this->email = $row['email'];
				$this->username = $row['username'];
				$this->password = $row['password'];
				
				break;
			}
		}

		// read email
		function readEmail() {
			// query to read single record
			$query = "SELECT
						idAdmin, nome, cognome, username, email, password
					FROM
						" . $this->table_name . " a
					WHERE
						a.email = ?
					LIMIT
						1";

			$stmt = $this->conn->prepare( $query );
			$stmt->bindParam(1, $this->email);

			$stmt->execute();

			return $stmt;
		}

		// read username
		function readUsername() {
			// query to read single record
			$query = "SELECT
						idAdmin, nome, cognome, username, email, password
					FROM
						" . $this->table_name . " a
					WHERE
						a.username = ?
					LIMIT
						1";

			$stmt = $this->conn->prepare( $query );
			$stmt->bindParam(1, $this->username);

			$stmt->execute();

			return $stmt;
		}

		// create
		function create() {
			// query insert
			$query = "INSERT INTO
						" . $this->table_name . "
					SET
						nome=:nome, cognome=:cognome, email=:email, username=:username, password=:password";

			$stmt = $this->conn->prepare($query);
		
			// sanitize
			$this->nome=htmlspecialchars(strip_tags($this->nome));
			$this->cognome=htmlspecialchars(strip_tags($this->cognome));
			$this->email=htmlspecialchars(strip_tags($this->email));
			$this->username=htmlspecialchars(strip_tags($this->username));
			$this->password=htmlspecialchars(strip_tags($this->password));
		
			// bind params
			$stmt->bindParam(":nome", $this->nome);
			$stmt->bindParam(":cognome", $this->cognome);
			$stmt->bindParam(":email", $this->email);
			$stmt->bindParam(":username", $this->username);
			$stmt->bindParam(":password", $this->password);

			if($stmt->execute())
				return true;
			
			return false;
		}

		// delete
		function delete() {
			// delete query
			$query = "DELETE FROM " . $this->table_name . " WHERE idAdmin = ?";
		
			// prepare query
			$stmt = $this->conn->prepare($query);
		
			// sanitize
			$this->idAdmin=htmlspecialchars(strip_tags($this->idAdmin));
		
			// bind id
			$stmt->bindParam(1, $this->idAdmin);
		
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
						nome=:nome, cognome=:cognome, email=:email, username=:username, password=:password
					WHERE
						idAdmin=:idAdmin";

			$stmt = $this->conn->prepare($query);
		
			// sanitize
			$this->idAdmin=htmlspecialchars(strip_tags($this->idAdmin));
			$this->nome=htmlspecialchars(strip_tags($this->nome));
			$this->cognome=htmlspecialchars(strip_tags($this->cognome));
			$this->email=htmlspecialchars(strip_tags($this->email));
			$this->username=htmlspecialchars(strip_tags($this->username));
			$this->password=htmlspecialchars(strip_tags($this->password));
		
			// bind params
			$stmt->bindParam(":idAdmin", $this->idAdmin);
			$stmt->bindParam(":nome", $this->nome);
			$stmt->bindParam(":cognome", $this->cognome);
			$stmt->bindParam(":email", $this->email);
			$stmt->bindParam(":username", $this->username);
			$stmt->bindParam(":password", $this->password);
		
			if($stmt->execute())
				return true;
		
			return false;
		}
	}
?>