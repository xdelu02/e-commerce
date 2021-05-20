<?php
	class Carrello {
		// connessione al db e nome tabella
		private $conn;
		private $table_name = "Carrelli";

		// proprietà
		public $idCliente;
		public $idProdotto;
		public $quantita;

		// costruttore
		public function __construct($db){
			$this->conn = $db;
		}

		// read
		function read() {
			// select all query
			$query = "SELECT
						idCliente, idProdotto, quantita
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
						idCliente, idProdotto, quantita
					FROM
						" . $this->table_name . " a
					WHERE
						a.idCliente = ?";

			$stmt = $this->conn->prepare( $query );
			$stmt->bindParam(1, $this->idCliente);

			$stmt->execute();

			return $stmt;
		}

		// read tot
		function readTot() {
			// query to innest prodotti and carrelli
			$query = "SELECT
						Carrelli.quantita as quantita, Prodotti.prezzo as prezzo
					FROM
						Carrelli INNER JOIN Prodotti
					ON Carrelli.idProdotto = Prodotti.idProdotto
					WHERE
						Carrelli.idCliente = ?";

			$stmt = $this->conn->prepare( $query );
			$stmt->bindParam(1, $this->idCliente);

			$stmt->execute();

			return $stmt;
		}

		// create
		function create() {
			// query insert
			$query = "INSERT INTO
						" . $this->table_name . "
					SET
						idCliente=:idCliente, idProdotto=:idProdotto, quantita=:quantita";

			$stmt = $this->conn->prepare($query);
		
			// sanitize
			$this->idCliente=htmlspecialchars(strip_tags($this->idCliente));
			$this->idProdotto=htmlspecialchars(strip_tags($this->idProdotto));
			$this->quantita=htmlspecialchars(strip_tags($this->quantita));
		
			// bind params
			$stmt->bindParam(":idCliente", $this->idCliente);
			$stmt->bindParam(":idProdotto", $this->idProdotto);
			$stmt->bindParam(":quantita", $this->quantita);

			if($stmt->execute())
				return true;
			
			return false;
		}

		// delete
		function delete() {
			// delete query
			$query = "DELETE FROM " . $this->table_name . " WHERE idCliente = ? AND idProdotto = ?";
		
			// prepare query
			$stmt = $this->conn->prepare($query);
		
			// sanitize
			$this->idCliente=htmlspecialchars(strip_tags($this->idCliente));
			$this->idProdotto=htmlspecialchars(strip_tags($this->idProdotto));
		
			// bind id
			$stmt->bindParam(1, $this->idCliente);
			$stmt->bindParam(2, $this->idProdotto);
		
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
						quantita=:quantita
					WHERE
						idAdmin=:idAdmin AND
						idProdotto=:idProdotto";

			$stmt = $this->conn->prepare($query);
		
			// sanitize
			$this->idCliente=htmlspecialchars(strip_tags($this->idCliente));
			$this->idProdotto=htmlspecialchars(strip_tags($this->idProdotto));
			$this->quantita=htmlspecialchars(strip_tags($this->quantita));
		
			// bind params
			$stmt->bindParam(":idCliente", $this->idCliente);
			$stmt->bindParam(":idProdotto", $this->idProdotto);
			$stmt->bindParam(":quantita", $this->quantita);
		
			if($stmt->execute())
				return true;
		
			return false;
		}
	}
?>