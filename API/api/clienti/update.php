<?php
	// required headers
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Methods: POST");
	header("Access-Control-Max-Age: 3600");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	
	// get database connection & obj
	include_once '../includes/db.inc.php';
	include_once '../objects/cliente.php';
	
	// set database connection & obj
	$database = new Database();
	$db = $database->getConnection();
	$obj = new Cliente($db);
	
	// get id to be edited
	$data = json_decode(file_get_contents("php://input"));
	
	// make sure data is not empty
	if(
		!empty($data->idCliente) &&
		!empty($data->nome) &&
		!empty($data->cognome) &&
		!empty($data->dataN)
	) {
		// set ID property to be edited
		$obj->idCliente = $data->idCliente;
		
		// set property values
		$obj->nome = $data->nome;
		$obj->cognome = $data->cognome;
		$obj->dataN = $data->dataN;
		
		// update the obj
		if($obj->update()) {
			// set response code - 200 ok
			http_response_code(200);
		
			// tell the user
			echo json_encode(array("message" => "Cliente was updated."));
		} else {
			// set response code - 503 service unavailable
			http_response_code(503);
		
			// tell the user
			echo json_encode(array("message" => "Unable to update cliente."));
		}
	} else { // tell the user data is incomplete
		// set response code - 400 bad request
		http_response_code(400);

		// tell the user
		echo json_encode(array("message" => "Unable to update cliente. Data is incomplete."));
	}
?>