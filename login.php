<?php
// cURL in PHP
$username = $_POST['username'];
$password = $_POST['password'];


if($username === '' || $password === '') { // Detect if any form field is empty
	echo json_encode('empty');
}
else { // Send data using cURL
	
	$formData = "ucid=".$username."&pass=".$password;
	$cSession = curl_init();
	curl_setopt($cSession, CURLOPT_URL, "https://web.njit.edu/~tmd24/CS490/checkAndPass.php");
	curl_setopt($cSession, CURLOPT_POST, TRUE);
	curl_setopt($cSession, CURLOPT_POSTFIELDS, $formData);
	curl_setopt($cSession, CURLOPT_RETURNTRANSFER, FALSE);
	$cResult = curl_exec($cSession);
	curl_close($cSession);
}
?>