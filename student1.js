/*jshint esversion: 6 */
//"use strict"; // Avoids error message //Use in functions

var screenDisplay = document.getElementById('show');

document.getElementById('takeE').onchange = function() {
	"use strict"; // Avoids error message
	takeExam();
};

document.getElementById('viewG').onchange = function() {
	"use strict"; // Avoids error message
	viewGrades();
};

function takeExam() {
	"use strict"; // Avoids error message
	screenDisplay.innerHTML = "<div><h1>Choose an exam to take:</h1><div id='showOpenExamsDiv'><form id='selectExamForm'></form></div></div>";
	
	var selectExamForm = document.getElementById('selectExamForm');
	
	// Fetch all questions and display in 
	var mainForm = document.getElementById('mainForm');
	var fData = new FormData(mainForm);
	fetch('student1GetExams.php', {
		method: 'POST',
		body: fData
	})
	.then( res => res.json()) // Once we have a response
	.then (newData => { // Data from response ^
		if(newData === 'error') {
			selectQForm.innerHTML = "ERROR";
		}
		else{
			var item;
			var eArray = newData.openExams.push('Exam1', 'Exam2');
			console.log("ArrayE:",eArray);
			for (item = 0; item < newData.openExams.length; item++) {
				selectExamForm.innerHTML += "<input type='radio' name='pickedE' value="+newData.openExams[item]+">"+newData.openExams[item]+"<br>";
			}
			selectExamForm.innerHTML += "<button type='button' id='checkedGButton' onclick='takeChecked()'>Take Exam</button>";
		}
	});
	
}

function viewGrades() {
	"use strict"; // Avoids error message
	screenDisplay.innerHTML = "<div><h1>Graded exams:</h1><div id='showGradesDiv'><form id='selectGradeForm'></form></div></div>";
	
	var selectGradeForm = document.getElementById('selectGradeForm');
	
	// Fetch all questions and display in 
	var mainForm = document.getElementById('mainForm');
	var fData = new FormData(mainForm);
	fetch('student1GetGrades.php', {
		method: 'POST',
		body: fData
	})
	.then( res => res.json()) // Once we have a response
	.then (newData => { // Data from response ^
		if(newData === 'error') {
			selectGradeForm.innerHTML = "ERROR";
		}
		else{
			var item;
			var gArray = newData.gradedExams.push('Exam1', 'Exam2');
			console.log("ArrayG:",gArray);
			for (item = 0; item < newData.gradedExams.length; item++) {
				selectGradeForm.innerHTML += "<input type='radio' name='pickedG' value="+newData.gradedExams[item]+">"+newData.gradedExams[item]+"<br>";
			}
			selectGradeForm.innerHTML += "<button type='button' id='checkedGButton' onclick='viewChecked()'>Take Exam</button>";
		}
	});
}

function takeChecked() {
	"use strict"; // Avoids error message
}

function viewChecked() {
	"use strict"; // Avoids error message
}