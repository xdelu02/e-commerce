<?php

    require "../../includes/db.inc.php";

    class API {
        function Select() {
            $conn = openCon();
            $users = array();
            $data = $conn->prepare("SELECT * FROM amministratori");
            $data->execute();
            $i = 0;
            while($row = $data->fetch(PDO::FETCH_ASSOC)) {
                $users[$i] = array(
                    'idAdmin' => $row['idAdmin'],
                    'nome' => $row['nome'],
                    'cognome' => $row['cognome'],
                    'username' => $row['username'],
                    'email' => $row['email'],
                    'password' => $row['password']
                );

                $i++;
            }
            closeCon($conn);
            return json_encode($users);
        }
    }

    $API = new API;
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    echo $API->Select();

?>