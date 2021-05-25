<?php
	include 'immagine.php';
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
		public $path;

		// costruttore
		public function __construct($db){
			$this->conn = $db;
		}

		// read
		function read() {
			// select all query
			$query = "SELECT
						p.idProdotto as idProdotto,
						p.nome as nome,
						p.descS as descS,
						p.descL as descL,
						p.prezzo as prezzo,
						p.quantita as quantita,
						p.idCategoria as idCategoria,
						i.path as path
					FROM
						" . $this->table_name . " as p INNER JOIN Immagini as i
						ON p.idProdotto = i.idProdotto
					ORDER BY nome";
		
			$stmt = $this->conn->prepare($query);
			$stmt->execute();
		
			return $stmt;
		}
		
		// read one
		function readOne() {
			// query to read single record
			$query = "SELECT
						p.idProdotto as idProdotto,
						p.nome as nome,
						p.descS as descS,
						p.descL as descL,
						p.prezzo as prezzo,
						p.quantita as quantita,
						p.idCategoria as idCategoria,
						i.path as path
					FROM
						" . $this->table_name . " as p INNER JOIN Immagini as i
						ON p.idProdotto = i.idProdotto
					WHERE
						p.idProdotto = ?
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
				$this->path = $row['path'];
				
				break;
			}
		}

		//read by cat
		function readCat() {
			// query to read single record
			$query = "SELECT
						p.idProdotto as idProdotto,
						p.nome as nome,
						p.descS as descS,
						p.descL as descL,
						p.prezzo as prezzo,
						p.quantita as quantita,
						p.idCategoria as idCategoria,
						i.path as path
					FROM
						" . $this->table_name . " as p INNER JOIN Immagini as i
						ON p.idProdotto = i.idProdotto
					WHERE
						p.idCategoria = ?";
						
			// prepare query
			$stmt = $this->conn->prepare($query);
					
			// sanitize
			$this->idCategoria=htmlspecialchars(strip_tags($this->idCategoria));

			// bind id
			$stmt->bindParam(1, $this->idCategoria);

			$stmt->execute();
			
			return $stmt;
		}
		
		// read rand
		function readRand() {
			// query to read single record
			$query = "SELECT
						p.idProdotto as idProdotto,
						p.nome as nome,
						p.descS as descS,
						p.descL as descL,
						p.prezzo as prezzo,
						p.quantita as quantita,
						p.idCategoria as idCategoria,
						i.path as path
					FROM
						" . $this->table_name . " as p INNER JOIN Immagini as i
						ON p.idProdotto = i.idProdotto
					ORDER BY RAND()
					LIMIT
						1";

			$stmt = $this->conn->prepare( $query );

			$stmt->execute();
			while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
				$this->idProdotto = $row['idProdotto'];
				$this->nome = $row['nome'];
				$this->descS = $row['descS'];
				$this->descL = $row['descL'];
				$this->prezzo = $row['prezzo'];
				$this->quantita = $row['quantita'];
				$this->idCategoria = $row['idCategoria'];
				$this->path = $row['path'];
				
				break;
			}
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

			if(!$stmt->execute()) {
				return false;
			}
			
			$query2 = "SELECT
						p.idProdotto as idProdotto
					FROM
						Prodotti as p
					ORDER BY p.idProdotto DESC
					LIMIT 1";
			$stmt2 = $this->conn->prepare($query2);

			$stmt2->execute();
			$id = 0;
			while ($row = $stmt2->fetch(PDO::FETCH_ASSOC)) {
				$id = $row['idProdotto'];
			}

			$img = new Immagine($this->conn);
			$img->idProdotto = $id;
			$img->path = $this->path;

			if($img->create())
				return true;

			return false;
		}

		// delete
		function delete() {
			// delete img query
			$query1 = "DELETE FROM Immagini WHERE idProdotto = ?";
			// prepare query
			$stmt1 = $this->conn->prepare($query1);
			// sanitize
			$this->idProdotto=htmlspecialchars(strip_tags($this->idProdotto));
			// bind id
			$stmt1->bindParam(1, $this->idProdotto);
			$stmt1->execute();

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
						p.idProdotto as idProdotto,
						p.nome as nome,
						p.descS as descS,
						p.descL as descL,
						p.prezzo as prezzo,
						p.quantita as quantita,
						p.idCategoria as idCategoria,
						i.path as path
					FROM
						Prodotti as p INNER JOIN Immagini as i
						ON p.idProdotto = i.idProdotto
					WHERE
						p.nome LIKE ? OR p.descS LIKE ? OR p.descL LIKE ? OR p.idCategoria LIKE ?
					ORDER BY
						p.nome";
		
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