<?php
	// required headers
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: access");
	header("Access-Control-Allow-Methods: GET");
	header("Access-Control-Allow-Credentials: true");
	header('Content-Type: application/json');

	// get database connection & obj
	include_once '../includes/db.inc.php';
	include_once '../objects/carrello.php';

	// set database connection & obj
	$database = new Database();
	$db = $database->getConnection();
	$obj = new Carrello($db);

	// set ID property of record to read
	$obj->idCliente = isset($_GET['email']) ? $_GET['email'] : die();
	$obj->idProdotto = isset($_GET['prodotto']) ? $_GET['prodotto'] : die();

	// read the details of obj to be edited
	$obj->readOne();

	if($obj->quantita!=null) {
		$arr = array(
			"email" => $obj->email,
			"prodotto" => $obj->prodotto,
			"quantita" => $obj->quantita
		);

		// set response code - 200 OK
		http_response_code(200);

		// make it json format
		echo json_encode($arr);
	} else {
		// set response code - 404 Not found
		http_response_code(404);

		// tell the user obj does not exist
		echo json_encode(array("message" => "Carrello of ".$_GET['email']." prodotto ".$_GET['prodotto']." does not exist."));
	}
?>