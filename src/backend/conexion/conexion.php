<?php

//include('config.php');

$con = new PDO("mysql:host=localhost; dbname=esamdb", "root", "");
$con->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$con->exec("SET CHARACTER SET utf8");