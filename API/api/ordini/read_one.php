<?php
	// required headers
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: access");
	header("Access-Control-Allow-Methods: GET");
	header("Access-Control-Allow-Credentials: true");
	header('Content-Type: application/json');

	// get database connection & obj
	include_once '../includes/db.inc.php';
	include_once '../objects/ordine.php';

	// set database connection & obj
	$database = new Database();
	$db = $database->getConnection();
	$obj = new Ordine($db);

	// set ID property of record to read
	$obj->idOrdine = isset($_GET['id']) ? $_GET['id'] : die();

	// read the details of obj to be edited
	$obj->readOne();

	if($obj->idCliente!=null) {
		$arr = array(
			"idOrdine" => $obj->idOrdine,
			"idCliente" => $obj->idCliente,
			"indirizzo" => $obj->indirizzo,
			"codice" => $obj->codice
		);

		// set response code - 200 OK
		http_response_code(200);

		// make it json format
		echo json_encode($arr);
	} else {
		// set response code - 404 Not found
		http_response_code(404);

		// tell the user obj does not exist
		echo json_encode(array("message" => "Ordine ".$_GET['id']." does not exist."));
	}
?>