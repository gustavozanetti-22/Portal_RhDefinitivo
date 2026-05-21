<?php
define('HOST', 'ec2-3-131-141-8.us-east-2.compute.amazonaws.com');
define('USUARIO', 'usr_3b_g14');
define('SENHA', 'g14B@123');
define('DB', 'ads_3b_grupo14');

$conn = mysqli_connect(HOST, USUARIO, SENHA, DB) or die ('Não foi possível conectar');
?>


