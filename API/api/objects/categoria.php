<?php
	class Categoria {
		// connessione al db e nome tabella
		private $conn;
		private $table_name = "categorie";

		// proprietà
		public $idCategoria;

		// costruttore
		public function __construct($db){
			$this->conn = $db;
		}

		// read
		function read() {
			// select all query
			$query = "SELECT
						idCategoria
					FROM
						" . $this->table_name . "
					ORDER BY idCategoria";
		
			$stmt = $this->conn->prepare($query);
			$stmt->execute();
		
			return $stmt;
		}

		// create
		function create() {
			// query insert
			$query = "INSERT INTO
						" . $this->table_name . "
					SET
						idCategoria=:idCategoria";

			$stmt = $this->conn->prepare($query);
		
			// sanitize
			$this->idCategoria=htmlspecialchars(strip_tags($this->idCategoria));
		
			// bind params
			$stmt->bindParam(":idCategoria", $this->idCategoria);

			if($stmt->execute())
				return true;
			
			return false;
		}

		// delete
		function delete() {
			// delete query
			$query = "DELETE FROM " . $this->table_name . " WHERE idCategoria = ?";
		
			// prepare query
			$stmt = $this->conn->prepare($query);
		
			// sanitize
			$this->idCategoria=htmlspecialchars(strip_tags($this->idCategoria));
		
			// bind id
			$stmt->bindParam(1, $this->idCategoria);
		
			if($stmt->execute())
				return true;
		
			return false;
		}
	}
?>