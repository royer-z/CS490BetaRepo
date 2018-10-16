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
			// Check if login is success and if instructor or student:
			// Middle may need to return student/professor UCID to redirect to correct pages
			if(newData.loginSucceeded === 'true' && newData.instructor === 'true') {
				result.innerHTML = "Welcome professor!<br>"+"Login success: "+newData.loginSucceeded+"<br>"+"Instructor: "+newData.instructor+"<br>";
				window.location.replace('instructor.html'); // redirect to instructor page
			}
			else if(newData.loginSucceeded === 'true' && newData.instructor === 'false') {
				result.innerHTML = "Welcome student!<br>"+"Login success: "+newData.loginSucceeded+"<br>"+"Instructor: "+newData.instructor+"<br>";
				window.location.replace('student.html'); // redirect to student page
			}
			else { // If login is unsuccessful: Display prompt
				result.innerHTML = "Incorrect login information.<br>"+" Login Success: "+newData.loginSucceeded+"<br>";
			}
		}
	});
});