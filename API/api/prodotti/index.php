<?php

    require "../../includes/db.inc.php";

    class API {
        function Select() {
            $conn = openCon();
            $users = array();
            $data = $conn->prepare("SELECT * FROM prodotti");
            $data->execute();
            $i = 0;
            while($row = $data->fetch(PDO::FETCH_ASSOC)) {
                $users[$i] = array(
                    'idProdotto' => $row['idProdotto'],
                    'nome' => $row['nome'],
                    'descS' => $row['descS'],
                    'descL' => $row['descL'],
                    'prezzo' => $row['prezzo'],
                    'quantita' => $row['quantita'],
                    'idCategoria' => $row['idCategoria'],
                    'dataN' => $row['dataN']
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