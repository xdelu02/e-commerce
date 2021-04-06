<?php
	// required headers
	header("Access-Control-Allow-Origin: *");
	header("Content-Type: application/json; charset=UTF-8");

	//read one if needed
	if(!empty($_GET['id'])) {
		include "./read_one.php";
		exit();
	}
	if(!empty($_GET['email'])) {
		include "./read_email.php";
		exit();
	}
	if(!empty($_GET['username'])) {
		include "./read_username.php";
		exit();
	}

	// get database connection & obj
	include_once '../includes/db.inc.php';
	include_once '../objects/amministratore.php';

	// set database connection & obj
	$database = new Database();
	$db = $database->getConnection();
	$obj = new Amministratore($db);

	// query clienti
	$stmt = $obj->read();
	$num = $stmt->rowCount();

	if($num>0) {
		$arr=array();
		$arr["records"]=array();

		// retrieve table contents
		while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
			extract($row);

			$item=array(
				"idAdmin" => $idAdmin,
				"nome" => $nome,
				"cognome" => $cognome,
				"username" => $username,
				"email" => $email,
				"password" => $password
			);

			array_push($arr["records"], $item);
		}

		// set response code - 200 OK
		http_response_code(200);

		// show products data in json format
		echo json_encode($arr);
	} else {
		// set response code - 404 Not found
		http_response_code(404);

		// tell the user no products found
		echo json_encode(
			array("message" => "No Amministratori found.")
		);
	}
?>