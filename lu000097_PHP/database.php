<?php 
$xml = simplexml_load_file("dbconfig.xml");
$db_servername = $xml->host;
$db_username = $xml->user;
$db_password = $xml->password;
$db_name = $xml->database;
$db_port = 3306;
?>