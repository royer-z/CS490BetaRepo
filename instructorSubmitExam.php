<?php
// cURL in PHP
$examName = $_POST['examName'];
$pickedQs = $_POST['pickedQ'];

if($examName === '') { // Detect if any form field is empty
	echo json_encode('Blank exam name!');
}
else { // Send data using cURL
	$formData;
	$formData->examName = $examName;
	$formData->pickedQs = $pickedQs;
	
	$formDataJSON = json_encode($formData);
	
	$cSession = curl_init();
	curl_setopt($cSession, CURLOPT_URL, "https://web.njit.edu/~tmd24/CS490/api/v1/createExam.php");
	curl_setopt($cSession, CURLOPT_POST, TRUE);
	curl_setopt($cSession, CURLOPT_POSTFIELDS, $formDataJSON);
	curl_setopt($cSession, CURLOPT_RETURNTRANSFER, TRUE);
	$cResult = curl_exec($cSession);
	curl_close($cSession);
	echo $cResult;
}
?>