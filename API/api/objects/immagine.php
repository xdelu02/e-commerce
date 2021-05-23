<?php
	class Immagine {
		// connessione al db e nome tabella
		private $conn;
		private $table_name = "immagini";

		// proprietà
		public $idImmagine;
		public $idProdotto;
		public $path;

		// costruttore
		public function __construct($db){
			$this->conn = $db;
		}

		// read
		function read() {
			// select all query
			$query = "SELECT
						idImmagine, idProdotto, path
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
						idImmagine, idProdotto, path
					FROM
						" . $this->table_name . " i
					WHERE
						i.idImmagine = ?
					LIMIT
						1";

			$stmt = $this->conn->prepare($query);
			$stmt->bindParam(1, $this->idImmagine);

			$stmt->execute();
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
		
			// set values to object properties
			$this->idImmagine = $row['idImmagine'];
			$this->idProdotto = $row['idProdotto'];
			$this->path = $row['path'];
		}

		// read
		function readProd() {
			// select all query
			$query = "SELECT
						idImmagine, idProdotto, path
					FROM
						" . $this->table_name . " i
					WHERE
						i.idProdotto = ?";
		
			$stmt = $this->conn->prepare($query);
			$stmt->bindParam(1, $this->idProdotto);

			$stmt->execute();
		
			return $stmt;
		}

		// read rand
		function readRand() {
			// query to read single record
			$query = "SELECT
						idImmagine, idProdotto, path
					FROM
						Immagini
					ORDER BY RAND()
					LIMIT 1";

			$stmt = $this->conn->prepare($query);
			$stmt->execute();
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
		
			// set values to object properties
			$this->idImmagine = $row['idImmagine'];
			$this->idProdotto = $row['idProdotto'];
			$this->path = $row['path'];
		}

		// create
		function create() {
			// query insert
			$query = "INSERT INTO
						" . $this->table_name . "
					SET
                        idProdotto=:idProdotto, path=:path";

			$stmt = $this->conn->prepare($query);
		
			// sanitize
			$this->idProdotto=htmlspecialchars(strip_tags($this->idProdotto));
			$this->path=htmlspecialchars(strip_tags($this->path));
		
			// bind params
			$stmt->bindParam(":idProdotto", $this->idProdotto);
			$stmt->bindParam(":path", $this->path);

			if($stmt->execute())
				return true;
			
			return false;
		}

		// delete
		function delete() {
			// delete query
			$query = "DELETE FROM " . $this->table_name . " WHERE idImmagine = ?";
		
			// prepare query
			$stmt = $this->conn->prepare($query);
		
			// sanitize
			$this->idImmagine=htmlspecialchars(strip_tags($this->idImmagine));
		
			// bind id
			$stmt->bindParam(1, $this->idImmagine);
		
			if($stmt->execute())
				return true;
		
			return false;
		}
	}
?>