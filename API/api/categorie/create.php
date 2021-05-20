<?php
	// required headers
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Methods: POST");
	header("Access-Control-Max-Age: 3600");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	// get database connection & obj
	include_once '../includes/db.inc.php';
	include_once '../objects/categoria.php';

	// set database connection & obj
	$database = new Database();
	$db = $database->getConnection();
	$obj = new Categoria($db);

	// get posted data
	$data = json_decode(file_get_contents("php://input"));

	// make sure data is not empty
	if(
		!empty($data->idCategoria)
	) {
		// set obj property values
		$obj->idCategoria = $data->idCategoria;

		// create the obj
		if($obj->create()) {
			// set response code - 201 created
			http_response_code(201);

			// tell the user
			echo json_encode(array("message" => "Categoria insert successfully."));
		} else {
			// set response code - 503 service unavailable
			http_response_code(503);

			// tell the user
			echo json_encode(array("message" => "Unable to insert categoria ".$data->idCategoria."."));
		}
	} else { // tell the user data is incomplete
		// set response code - 400 bad request
		http_response_code(400);

		// tell the user
		echo json_encode(array("message" => "Unable to insert categoria. Data is incomplete."));
	}
?>