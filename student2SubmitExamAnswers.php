<?php
// cURL in PHP
$answerText = $_POST['studentAnswerText'];
$questIds = $_POST['questIds']; 


if(count($studentAnswerText) == 0 || count($questIds) == 0) { // Detect if questions were selected
	echo json_encode('empty');
}
else { // Send data using cURL
	$formData;
	$formData->answerText = $answerText;
	$formData->questIds = $questIds;
	
	$formDataJSON = json_encode($formData);
	
	$cSession = curl_init();
	curl_setopt($cSession, CURLOPT_URL, "https://web.njit.edu/~tmd24/CS490/api/v1/submitAnswer.php");
	curl_setopt($cSession, CURLOPT_POST, TRUE);
	curl_setopt($cSession, CURLOPT_POSTFIELDS, $formDataJSON);
	curl_setopt($cSession, CURLOPT_RETURNTRANSFER, TRUE);
	$cResult = curl_exec($cSession);
	curl_close($cSession);
	echo $cResult;
}
?>