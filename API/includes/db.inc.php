<?php
    function openCon() {
        $dbhost = "localhost";
        $dbuser = "root";
        $dbpass = "";
        $db = "ecommerce";
        $dsn = "mysql:host=".$dbhost.";dbname=".$db;
        $conn = new PDO($dsn, $dbuser, $dbpass);

        return $conn;
    }

    function closeCon(&$conn) {
        $conn = null;
    }
?>