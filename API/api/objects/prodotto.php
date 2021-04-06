<?php
	class Prodotto {
		// connessione al db e nome tabella
		private $conn;
		private $table_name = "prodotti";

		// proprietà
		public $idProdotto;
		public $nome;
		public $descS;
		public $descL;
		public $prezzo;
		public $quantita;
		public $idCategoria;

		// costruttore
		public function __construct($db){
			$this->conn = $db;
		}

		// read
		function read() {
			// select all query
			$query = "SELECT
						idProdotto, nome, descS, descL, prezzo, quantita, idCategoria
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
						idProdotto, nome, descS, descL, prezzo, quantita, idCategoria
					FROM
						" . $this->table_name . " a
					WHERE
						a.idProdotto = ?
					LIMIT
						1";

			$stmt = $this->conn->prepare( $query );
			$stmt->bindParam(1, $this->idProdotto);

			$stmt->execute();
			while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$this->idProdotto = $row['idProdotto'];
				$this->nome = $row['nome'];
				$this->descS = $row['descS'];
				$this->descL = $row['descL'];
				$this->prezzo = $row['prezzo'];
				$this->quantita = $row['quantita'];
				$this->idCategoria = $row['idCategoria'];
				
				break;
			}
		}

		//read by cat
		function readCat() {
			// query to read single record
			$query = "SELECT
						idProdotto, nome, descS, descL, prezzo, quantita, idCategoria
					FROM
						" . $this->table_name . " a
					WHERE
						a.idCategoria = ?";
						
			// prepare query
			$stmt = $this->conn->prepare($query);
					
			// sanitize
			$this->idCategoria=htmlspecialchars(strip_tags($this->idCategoria));

			// bind id
			$stmt->bindParam(1, $this->idCategoria);

			$stmt->execute();
			
			return $stmt;
		}

		// create
		function create() {
			// query insert
			$query = "INSERT INTO
						" . $this->table_name . "
					SET
						nome=:nome, descS=:descS, descL=:descL, prezzo=:prezzo, quantita=:quantita, idCategoria=:idCategoria";

			$stmt = $this->conn->prepare($query);
		
			// sanitize
			$this->nome=htmlspecialchars(strip_tags($this->nome));
			$this->descS=htmlspecialchars(strip_tags($this->descS));
			$this->descL=htmlspecialchars(strip_tags($this->descL));
			$this->prezzo=htmlspecialchars(strip_tags($this->prezzo));
			$this->quantita=htmlspecialchars(strip_tags($this->quantita));
			$this->idCategoria=htmlspecialchars(strip_tags($this->idCategoria));
		
			// bind params
			$stmt->bindParam(":nome", $this->nome);
			$stmt->bindParam(":descS", $this->descS);
			$stmt->bindParam(":descL", $this->descL);
			$stmt->bindParam(":prezzo", $this->prezzo);
			$stmt->bindParam(":quantita", $this->quantita);
			$stmt->bindParam(":idCategoria", $this->idCategoria);

			if($stmt->execute())
				return true;
			
			return false;
		}

		// delete
		function delete() {
			// delete query
			$query = "DELETE FROM " . $this->table_name . " WHERE idProdotto = ?";
		
			// prepare query
			$stmt = $this->conn->prepare($query);
		
			// sanitize
			$this->idProdotto=htmlspecialchars(strip_tags($this->idProdotto));
		
			// bind id
			$stmt->bindParam(1, $this->idProdotto);
		
			if($stmt->execute())
				return true;
		
			return false;
		}

		// search
		function search($keywords) {
			// select all query
			$query = "SELECT
						idProdotto, nome, descS, descL, prezzo, quantita, idCategoria
					FROM
						" . $this->table_name . " p
					WHERE
						p.nome LIKE ? OR p.descS LIKE ? OR p.descL LIKE ? OR p.idCategoria LIKE ?
					ORDER BY
						p.idProdotto";
		
			// prepare query statement
			$stmt = $this->conn->prepare($query);
		
			// sanitize
			$keywords=htmlspecialchars(strip_tags($keywords));
			$keywords = "%{$keywords}%";
		
			// bind
			$stmt->bindParam(1, $keywords);
			$stmt->bindParam(2, $keywords);
			$stmt->bindParam(3, $keywords);
			$stmt->bindParam(4, $keywords);
		
			$stmt->execute();
		
			return $stmt;
		}

		// update
		function update() {
			// update query
			$query = "UPDATE
						" . $this->table_name . "
					SET
						nome=:nome, descS=:descS, descL=:descL, prezzo=:prezzo, quantita=:quantita, idCategoria=:idCategoria
					WHERE
						idProdotto=:idProdotto";

			$stmt = $this->conn->prepare($query);
		
			// sanitize
			$this->idProdotto=htmlspecialchars(strip_tags($this->idProdotto));
			$this->nome=htmlspecialchars(strip_tags($this->nome));
			$this->descS=htmlspecialchars(strip_tags($this->descS));
			$this->descL=htmlspecialchars(strip_tags($this->descL));
			$this->prezzo=htmlspecialchars(strip_tags($this->prezzo));
			$this->quantita=htmlspecialchars(strip_tags($this->quantita));
			$this->idCategoria=htmlspecialchars(strip_tags($this->idCategoria));
		
			// bind params
			$stmt->bindParam(":idProdotto", $this->idProdotto);
			$stmt->bindParam(":nome", $this->nome);
			$stmt->bindParam(":descS", $this->descS);
			$stmt->bindParam(":descL", $this->descL);
			$stmt->bindParam(":prezzo", $this->prezzo);
			$stmt->bindParam(":quantita", $this->quantita);
			$stmt->bindParam(":idCategoria", $this->idCategoria);
		
			if($stmt->execute())
				return true;
		
			return false;
		}
	}
?>