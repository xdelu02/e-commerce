<?php
	class DatiCliente {
		// connessione al db e nome tabella
		private $conn;
		private $table_name = "daticlienti";

		// proprietà
		public $idCliente;
		public $email;
		public $password;
		public $saldo;

		// costruttore
		public function __construct($db){
			$this->conn = $db;
		}

		// read
		function read() {
			// select all query
			$query = "SELECT
						idCliente, email, password, saldo
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
						idCliente, email, password, saldo
					FROM
						" . $this->table_name . " c
					WHERE
						c.idCliente = ?
					LIMIT
						1";

			$stmt = $this->conn->prepare( $query );
			$stmt->bindParam(1, $this->idCliente);

			$stmt->execute();
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
		
			// set values to object properties
			$this->idCliente = $row['idCliente'];
			$this->email = $row['email'];
			$this->password = $row['password'];
			$this->saldo = $row['saldo'];
		}

		// read email
		function readEmail() {
			// query to read single record
			$query = "SELECT
						idCliente, email, password, saldo
					FROM
						" . $this->table_name . " c
					WHERE
						c.email = ?
					LIMIT
						1";

			$stmt = $this->conn->prepare( $query );
			$stmt->bindParam(1, $this->email);

			$stmt->execute();

			return $stmt;
		}

		// create
		function create() {
			// query insert
			$query = "INSERT INTO
						" . $this->table_name . "
					SET
						email=:email, password=:password, saldo=0";

			$stmt = $this->conn->prepare($query);
		
			// sanitize
			$this->email=htmlspecialchars(strip_tags($this->email));
			$this->password=htmlspecialchars(strip_tags($this->password));
		
			// bind params
			$stmt->bindParam(":email", $this->email);
			$stmt->bindParam(":password", $this->password);

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
						email=:email, password=:password, saldo=:saldo
					WHERE
						idCliente=:idCliente";

			$stmt = $this->conn->prepare($query);
		
			// sanitize
			$this->idCliente=htmlspecialchars(strip_tags($this->idCliente));;
			$this->email=htmlspecialchars(strip_tags($this->email));
			$this->password=htmlspecialchars(strip_tags($this->password));
			$this->saldo=htmlspecialchars(strip_tags($this->saldo));
		
			// bind params
			$stmt->bindParam(":idCliente", $this->idCliente);
			$stmt->bindParam(":email", $this->email);
			$stmt->bindParam(":password", $this->password);
			$stmt->bindParam(":saldo", $this->saldo);
		
			if($stmt->execute())
				return true;
		
			return false;
		}
	}
?>