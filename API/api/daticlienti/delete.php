<?php
	// required headers
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Methods: POST");
	header("Access-Control-Max-Age: 3600");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	// include database and obj
	include_once '../includes/db.inc.php';
	include_once '../objects/daticliente.php';

	// set database connection & obj
	$database = new Database();
	$db = $database->getConnection();
	$obj = new DatiCliente($db);

	// get posted data
	$data = json_decode(file_get_contents("php://input"));

	// set product id to be deleted
	$obj->idCliente = $data->idCliente;

	// delete the product
	if($obj->delete()) {
		// set response code - 200 ok
		http_response_code(200);

		// tell the user
		echo json_encode(array("message" => "DCliente deleted successfully."));
	} else {
		// set response code - 503 service unavailable
		http_response_code(503);

		// tell the user
		echo json_encode(array("message" => "Unable to delete DCliente."));
	}
?>