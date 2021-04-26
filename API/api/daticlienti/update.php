<?php
	// required headers
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Methods: POST");
	header("Access-Control-Max-Age: 3600");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
	
	// get database connection & obj
	include_once '../includes/db.inc.php';
	include_once '../objects/daticliente.php';
	
	// set database connection & obj
	$database = new Database();
	$db = $database->getConnection();
	$obj = new DatiCliente($db);
	
	// get id to be edited
	$data = json_decode(file_get_contents("php://input"));

	// make sure data is not empty
	if(
		!empty($data->idCliente) &&
		!empty($data->email) &&
		!empty($data->password) &&
		!empty($data->saldo)
	) {
		// set ID property to be edited
		$obj->idCliente = $data->idCliente;
		
		// set property values
		$obj->email = $data->email;
		$obj->password = $data->password;
		$obj->saldo = $data->saldo;
		
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
		echo json_encode(array("message" => "Unable to update DCliente. Data is incomplete."));
	}
?>