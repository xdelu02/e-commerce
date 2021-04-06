<?php
	class DettaglioOrdine {
		// connessione al db e nome tabella
		private $conn;
		private $table_name = "dettaglioordine";

		// proprietà
		public $idDettaglioOrdine;
		public $idOrdine;
		public $idProdotto;
		public $prezzoU;
		public $quantita;

		// costruttore
		public function __construct($db){
			$this->conn = $db;
		}

		// read
		function read() {
			// select all query
			$query = "SELECT
						idDettaglioOrdine, idOrdine, idProdotto, prezzoU, quantita
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
                        idDettaglioOrdine, idOrdine, idProdotto, prezzoU, quantita
					FROM
						" . $this->table_name . " d
					WHERE
						d.idDettaglioOrdine = ?
					LIMIT
						1";

			$stmt = $this->conn->prepare($query);
			$stmt->bindParam(1, $this->idDettaglioOrdine);

			$stmt->execute();
			$row = $stmt->fetch(PDO::FETCH_ASSOC);
		
			// set values to object properties
			$this->idDettaglioOrdine = $row['idDettaglioOrdine'];
			$this->idOrdine = $row['idOrdine'];
			$this->idProdotto = $row['idProdotto'];
			$this->prezzoU = $row['prezzoU'];
			$this->quantita = $row['quantita'];
		}

		// read by ordine
		function readOrd() {
			// select all query
			$query = "SELECT
						idDettaglioOrdine, idOrdine, idProdotto, prezzoU, quantita
					FROM
						" . $this->table_name . " d
					WHERE
						d.idOrdine = ?";
		
			$stmt = $this->conn->prepare($query);
			$stmt->bindParam(1, $this->idOrdine);

			$stmt->execute();
		
			return $stmt;
		}

		// create
		function create() {
			// query insert
			$query = "INSERT INTO
						" . $this->table_name . "
					SET
                        idDettaglioOrdine=:idDettaglioOrdine, idOrdine=:idOrdine, idProdotto=:idProdotto, prezzoU=:prezzoU, quantita=:quantita";

			$stmt = $this->conn->prepare($query);
		
			// sanitize
			$this->idDettaglioOrdine=htmlspecialchars(strip_tags($this->idDettaglioOrdine));
			$this->idOrdine=htmlspecialchars(strip_tags($this->idOrdine));
			$this->idProdotto=htmlspecialchars(strip_tags($this->idProdotto));
			$this->prezzoU=htmlspecialchars(strip_tags($this->prezzoU));
			$this->quantita=htmlspecialchars(strip_tags($this->quantita));
		
			// bind params
			$stmt->bindParam(":idDettaglioOrdine", $this->idDettaglioOrdine);
			$stmt->bindParam(":idOrdine", $this->idOrdine);
			$stmt->bindParam(":idProdotto", $this->idProdotto);
			$stmt->bindParam(":prezzoU", $this->prezzoU);
			$stmt->bindParam(":quantita", $this->quantita);

			if($stmt->execute())
				return true;
			
			return false;
		}

		// delete
		function delete() {
			// delete query
			$query = "DELETE FROM " . $this->table_name . " WHERE idDettaglioOrdine = ?";
		
			// prepare query
			$stmt = $this->conn->prepare($query);
		
			// sanitize
			$this->idDettaglioOrdine=htmlspecialchars(strip_tags($this->idDettaglioOrdine));
		
			// bind id
			$stmt->bindParam(1, $this->idDettaglioOrdine);
		
			if($stmt->execute())
				return true;
		
			return false;
		}
	}
?>