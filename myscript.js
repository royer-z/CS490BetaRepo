/*jshint esversion: 6 */

var onlyForm = document.getElementById('onlyForm');
var result = document.getElementById('result');

onlyForm.addEventListener('submit', function(event) {
	"use strict"; // Avoids error message
	event.preventDefault(); // Prevents page refresh and hides form input from URL
	
	var fData = new FormData(onlyForm);
	
	fetch('login.php', {
		method: 'POST',
		body: fData
	})
	.then( res => res.json()) // Once we have a response
	.then (newData => { // Data from response ^
		if(newData === 'empty') {
			result.innerHTML = "Please fill in all fields.";
		}
		else{
			if(newData.njitLoginSucceeded === 'true' || newData.backendLoginSucceeded === 'true') {
				result.innerHTML = "Welcome!<br>"+" NJIT: "+newData.njitLoginSucceeded+"<br>"+"Back-end: "+newData.backendLoginSucceeded;
			}
			else {
				result.innerHTML = "Incorrect login information.<br>"+" NJIT: "+newData.njitLoginSucceeded+"<br>"+"Back-end: "+newData.backendLoginSucceeded;
			}
		}
	});
});