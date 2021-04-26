<?php
	// required headers
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Methods: POST");
	header("Access-Control-Max-Age: 3600");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	// get database connection & obj
	include_once '../includes/db.inc.php';
	include_once '../objects/amministratore.php';

	// set database connection & obj
	$database = new Database();
	$db = $database->getConnection();
	$obj = new Amministratore($db);

	// get posted data
	$data = json_decode(file_get_contents("php://input"));

	// make sure data is not empty
	if(
		!empty($data->nome) &&
		!empty($data->cognome) &&
		!empty($data->username) &&
		!empty($data->email) &&
		!empty($data->password)
	) {
		// set obj property values
		$obj->nome = $data->nome;
		$obj->cognome = $data->cognome;
		$obj->username = $data->username;
		$obj->email = $data->email;
		$obj->password = $data->password;

		// create the obj
		if($obj->create()) {
			// set response code - 201 created
			http_response_code(201);

			// tell the user
			echo json_encode(array("message" => "Amministratore insert successfully."));
		} else {
			// set response code - 503 service unavailable
			http_response_code(503);

			// tell the user
			echo json_encode(array("message" => "Unable to insert amministratore."));
		}
	} else { // tell the user data is incomplete
		// set response code - 400 bad request
		http_response_code(400);

		// tell the user
		echo json_encode(array("message" => "Unable to insert amministratore. Data is incomplete."));
	}
?>