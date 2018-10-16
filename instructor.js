/*jshint esversion: 6 */
//"use strict"; // Avoids error message //Use in functions

var screenDisplay = document.getElementById('show');

document.getElementById('createQ').onchange = function() {
	"use strict"; // Avoids error message
	createQuestion();
};

document.getElementById('createE').onchange = function() {
	"use strict"; // Avoids error message
	createExam();
};

document.getElementById('releaseE').onchange = function() {
	"use strict"; // Avoids error message
	releaseExam();
};

document.getElementById('releaseG').onchange = function() {
	"use strict"; // Avoids error message
	releaseGrade();
};

function createQuestion() {
	"use strict"; // Avoids error message
	screenDisplay.innerHTML = "<div id='recentlyAddedQ'><h1>Recently added questions:</h1><div id='questionsListDiv'></div></div><div id='addQ'><h1>Add a question:</h1><form id='addQForm'><textarea form='addQForm' name='prompt' placeholder='Question'></textarea><br><input type='text' name='topic' placeholder='Topic'><br><input type='text' name='parameter1' placeholder='Required parameter 1'><br><input type='text' name='parameter2' placeholder='Required parameter 2'><br><input type='text' name='output' placeholder='Required output'><br><input type='text' name='functionName' placeholder='Required function name'><br><input type='radio' name='difficulty' value='1'> Easy<br><input type='radio' name='difficulty' value='2'> Medium<br><input type='radio' name='difficulty' value='3'> Hard<br><button type='button' id='addQButton' onclick='submitQuestion()'>Add</button><p id='error'>Result</p></form></div>";
	
}

function createExam() {
	"use strict"; // Avoids error message
	screenDisplay.innerHTML = "<div id='examDraft'><h1>Draft of exam:</h1><div id='examDraftDiv'></div></div><div id='availableQ'><h1>Available questions:</h1><form id='selectQForm'></form></div>";
	
	var selectQForm = document.getElementById('selectQForm');
	
	// Fetch all questions and display in 
	var mainForm = document.getElementById('mainForm');
	var fData = new FormData(mainForm);
	fetch('instructorCreateE.php', {
		method: 'POST',
		body: fData
	})
	.then( res => res.json()) // Once we have a response
	.then (newData => { // Data from response ^
		if(newData === 'error') {
			selectQForm.innerHTML = "ERROR";
		}
		else{
			selectQForm.innerHTML += "<input type='text' name='examName' placeholder='Exam name'><br>";
			var item;
			var qArray = newData.questions.push('test', 'test2');
			console.log("ArrayQ:",qArray);
			for (item = 0; item < newData.questions.length; item++) {
				selectQForm.innerHTML += "<input type='checkbox' name='pickedQ' value="+newData.questions[item]+">"+newData.questions[item]+"<br>";
			}
			selectQForm.innerHTML += "<button type='button' id='checkedQButton' onclick='addAllChecked()'>View Draft</button>";
		}
	});
}

function releaseExam() {
	"use strict"; // Avoids error message
	screenDisplay.innerHTML = "<div><h1>Select an exam to release to students:</h1><br><div id='allExamsDiv'><form id='selectEForm'></form></div></div>";
	
	var allExamsDiv = document.getElementById('allExamsDiv');
	var mainForm = document.getElementById('mainForm');
	var fData = new FormData(mainForm);
	fetch('instructorReleaseExam.php', {
		method: 'POST',
		body: fData
	})
	.then( res => res.json()) // Once we have a response
	.then (newData => { // Data from response ^
		if(newData === 'error') {
			allExamsDiv.innerHTML = "ERROR";
		}
		else{
			var item;
			var eArray =  newData.exams.push('exam1', 'exam2', 'exam3');
			console.log("ArrayE:",eArray);
			for (item = 0; item < newData.exams.length; item++) {
				selectEForm.innerHTML += "<input type='radio' name='pickedE' value="+newData.exams[item]+">"+newData.exams[item]+"<br>";
			}
			selectEForm.innerHTML += "<button type='button' id='radioEButton' onclick='releaseRadioExam()'>Release Exam</button><br><p id='radioResult'></p>";
		}
	});
}

function releaseGrade() {
	"use strict"; // Avoids error message
	screenDisplay.innerHTML = "<div><h1>Select a graded exam to release:</h1><br><div id='gradedExamsDiv'><form id='selectGEForm'></form></div></div>";
	
	var gradedExamsDiv = document.getElementById('gradedExamsDiv');
	
	var mainForm = document.getElementById('mainForm');
	var fData = new FormData(mainForm);
	fetch('instructorReleaseGrade.php', {
		method: 'POST',
		body: fData
	})
	.then( res => res.json()) // Once we have a response
	.then (newData => { // Data from response ^
		if(newData === 'error') {
			gradedExamsDiv.innerHTML = "ERROR";
		}
		else{
			var item;
			var gArray =  newData.exams.push('graded1', 'graded2', 'graded3');
			console.log("ArrayG:",gArray);
			for (item = 0; item < newData.exams.length; item++) {
				selectGEForm.innerHTML += "<input type='radio' name='pickedGE' value="+newData.exams[item]+">"+newData.exams[item]+"<br>";
			}
			selectGEForm.innerHTML += "<button type='button' id='radioGEButton' onclick='releaseRadioGradedExam()'>Release Graded Exam</button><br><p id='radioGradedResult'></p>";
		}
	});
}

function submitQuestion() {
	"use strict"; // Avoids error message
	
	var error = document.getElementById('error');
	var onlyAddQForm = document.getElementById('addQForm');
	var questionsListDiv = document.getElementById('questionsListDiv');
	
	var fData = new FormData(onlyAddQForm);
	
	fetch('instructorAddQ.php', {
		method: 'POST',
		body: fData
	})
	.then( res => res.json()) // Once we have a response
	.then (newData => { // Data from response ^
		if(newData === 'empty') {
			error.innerHTML = "Please fill in all fields.";
		}
		else{ 
			questionsListDiv.innerHTML += newData.questionText+"<br>";
			questionsListDiv.innerHTML += newData.topic+"<br>";
			
			if(newData.difficulty === '1') {
				questionsListDiv.innerHTML += "Easy<br><br>";
			}
			else if(newData.difficulty === '2') {
				questionsListDiv.innerHTML += "Medium<br><br>";
			}
			else if(newData.difficulty === '3') {
				questionsListDiv.innerHTML += "Hard<br><br>";
			}
		}
	});
	
}

function addAllChecked() {
	"use strict"; // Avoids error message
	
	var examDraftDiv = document.getElementById('examDraftDiv');
	var onlyExamDraftForm = document.getElementById('selectQForm');
	
	var fData = new FormData(onlyExamDraftForm);
	
	examDraftDiv.innerHTML = "";
	for (var value of fData.values()) {
		examDraftDiv.innerHTML += value+"<br>"; 
	}
	
	examDraftDiv.innerHTML += "<button type='button id='submitDraftButton' onclick='submitDraft()'>Create Exam</button>";
	examDraftDiv.innerHTML += "<p id='createExamResult'></p>";
}

function submitDraft() {
	"use strict"; // Avoids error message
	
	var onlyExamDraftForm = document.getElementById('selectQForm');
	var fData = new FormData(onlyExamDraftForm);
	var result = document.getElementById('createExamResult');
	
	fetch('instructorSubmitExam.php', {
		method: 'POST',
		body: fData
	})
	.then( res => res.json()) // Once we have a response
	.then (newData => { // Data from response ^
		if(newData === 'Blank exam name!') {
			result.innerHTML = "Blank exam name!";
		}
		else{
			result.innerHTML = "Exam created!";
		}
	});
}

function releaseRadioExam() {
	"use strict"; // Avoids error message
	var onlyReleaseExamForm = document.getElementById('selectEForm');
	var fData = new FormData(onlyReleaseExamForm);
	var radioResult = document.getElementById('radioResult');
	
	fetch('instructorSubmitRelease.php', {
		method: 'POST',
		body: fData
	})
	.then( res => res.json()) // Once we have a response
	.then (newData => { // Data from response ^
		if(newData === 'Please choose an exam') {
			radioResult.innerHTML = "Please fill in all fields.";
		}
		else{ 
			radioResult.innerHTML = "Exam released!";
		}
	});
}

function releaseRadioGradedExam() {
	"use strict"; // Avoids error message
	var onlyReleaseGradedExamForm = document.getElementById('selectGEForm');
	var fData = new FormData(onlyReleaseGradedExamForm);
	var radioGradedResult = document.getElementById('radioGradedResult');
	
	fetch('instructorSubmitGraded.php', {
		method: 'POST',
		body: fData
	})
	.then( res => res.json()) // Once we have a response
	.then (newData => { // Data from response ^
		if(newData === 'Please choose an exam') {
			radioGradedResult.innerHTML = "Please fill in all fields.";
		}
		else{ 
			radioGradedResult.innerHTML = "Exam released!";
		}
	});
}