<?php
	// required headers
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

	//read one if needed
	if(!empty($_GET['email']) && !empty($_GET['prodotto'])) {
		include "./read_one.php";
		exit();
	}
	if(!empty($_GET['email']) && !empty($_GET['tot'])) {
		include "./read_tot.php";
		exit();
	}
	if(!empty($_GET['email'])) {
		include "./read_email.php";
		exit();
	}

	// set response code - 400 Bed Request
	http_response_code(400);

	// tell the user no products found
	echo json_encode(
		array("message" => "Bad Request.")
	);
?>