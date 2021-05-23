<?php
	// required headers
	header("Access-Control-Allow-Origin: *");
	header("Access-Control-Allow-Headers: access");
	header("Access-Control-Allow-Methods: GET");
	header("Access-Control-Allow-Credentials: true");
	header('Content-Type: application/json');

	// get database connection & obj
	include_once '../includes/db.inc.php';
	include_once '../objects/immagine.php';

	// set database connection & obj
	$database = new Database();
	$db = $database->getConnection();
	$obj = new Immagine($db);

	// read the details of obj to be edited
	$obj->readRand();

	if($obj->idProdotto!=null) {
		$arr = array(
			"idImmagine" => $obj->idImmagine,
			"idProdotto" => $obj->idProdotto,
			"path" => $obj->path
		);

		// set response code - 200 OK
		http_response_code(200);

		// make it json format
		echo json_encode($arr);
	} else {
		// set response code - 404 Not found
		http_response_code(404);

		// tell the user obj does not exist
		echo json_encode(array("message" => "Immagine ".$_GET['id']." does not exist."));
	}
?>