<?php
	// required headers
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

	//read one if needed
	if(!empty($_GET['id'])) {
		include "./read_one.php";
		exit();
	}
	if(!empty($_GET['key'])) {
		include "./search.php";
		exit();
	}
	if(!empty($_GET['idCategoria'])) {
		include "./read_cat.php";
		exit();
	}
	if(!empty($_GET['rand'])) {
		include "./read_rand.php";
		exit();
	}

	// get database connection & obj
	include_once '../includes/db.inc.php';
	include_once '../objects/prodotto.php';

	// set database connection & obj
	$database = new Database();
	$db = $database->getConnection();
	$obj = new Prodotto($db);

	// query clienti
	$stmt = $obj->read();
	$num = $stmt->rowCount();

	if($num>0) {
		$arr=array();
		$arr["records"]=array();

		// retrieve table contents
		while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
			extract($row);

			$item=array(
				"idProdotto" => $idProdotto,
				"nome" => $nome,
				"descS" => $descS,
				"descL" => $descL,
				"prezzo" => $prezzo,
				"quantita" => $quantita,
				"idCategoria" => $idCategoria,
				"path" => $path
			);

			array_push($arr["records"], $item);
		}

		// set response code - 200 OK
		http_response_code(200);

		// show products data in json format
		echo json_encode($arr);
	} else {
		// set response code - 404 Not found
		http_response_code(404);

		// tell the user no products found
		echo json_encode(
			array("message" => "No Prodotti found.")
		);
	}
?>