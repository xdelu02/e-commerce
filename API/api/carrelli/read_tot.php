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
	$stmt = $obj->readEmail();
	$num = $stmt->rowCount();

	if($num > 0) {
		$tot = 0;

		// retrieve table contents
		while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
			extract($row);

			$tot += $quantita*$prezzo;
		}

		// set response code - 200 OK
		http_response_code(200);

		// show products data in json format
		echo json_encode(array("tot" => $tot));
	} else{
		// set response code - 404 Not found
		http_response_code(404);

		// tell the user no products found
		echo json_encode(
			array("message" => "No Carrello found.")
		);
	}
?>