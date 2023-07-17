// console.log("Hello world");

// var checkBtn = document.getElementById('check');
var answerLabel = document.getElementById("answerLabel");
var nextBtn = document.getElementById("next-btn");
var finishBtn = document.getElementById("finish-btn");
var showResultBtn = document.getElementById("show-result-btn");
var dummyBtn = document.getElementById("dummy");
let sessionResults = sessionStorage.getItem("questionResults");


if (nextBtn) {
  if (nextBtn.length > 0) {
    finishBtn.setAttribute("hidden", true);

  } else {
    finishBtn.setAttribute("hidden", false);
   
  }
}

function displayRadioValue() {
  let sessionResults = sessionStorage.getItem("questionResults");
  let questionResults = sessionResults ? JSON.parse(sessionResults) : {};
  let questionID = document.getElementById("questionID").value;

  var ele = document.getElementsByName("option");
  for (i = 0; i < ele.length; i++) {
    if (ele[i].checked) {
      checked_val = ele[i].value;
      
      if (checked_val == answerLabel.value) {

        questionResults[questionID] = true;

        console.log("Correct");
        document.getElementById("check").disabled = true;
        document.getElementById("option_one").disabled = true;
        document.getElementById("option_two").disabled = true;
        document.getElementById("option_three").disabled = true;
        document.getElementById("option_four").disabled = true;
        result_div.innerHTML = `
				<div class="h5 mb-3"><b>Correct</b></div>
				`;
      } else {
        questionResults[questionID] = false;
        console.log("Wrong");
        document.getElementById("check").disabled = true;
        document.getElementById("option_one").disabled = true;
        document.getElementById("option_two").disabled = true;
        document.getElementById("option_three").disabled = true;
        document.getElementById("option_four").disabled = true;
        result_div.innerHTML = `
				<div class="h5 mb-3"><b>Wrong, Correct answer is ${answerLabel.value}</b></div>
				`;
      }
    }

  }
  sessionStorage.setItem("questionResults", JSON.stringify(questionResults));
  console.log(questionResults); 
}



// Handle Finish button click event
document.getElementById("finish-btn").addEventListener("click", function() {
  showResults();
});

// Handle Show Results button click event
document.getElementById("show-result-btn").addEventListener("click", function() {
  showResults();
});

// Show the results in Section 2
function showResults() {
  let sessionResults = sessionStorage.getItem("questionResults");
  let questionResults = sessionResults ? JSON.parse(sessionResults) : {};

  let totalQuestions = Object.keys(questionResults).length;
  let correctAnswers = 0;
  
  // Iterate over question results and calculate correct answers
  for (let questionID in questionResults) {
    if (questionResults[questionID] === true) {
      correctAnswers++;
    }
  }
  
  let percentage = (correctAnswers / totalQuestions) * 100;
  percentage = isNaN(percentage) ? 0 : percentage.toFixed(2);
  
  let resultsContainer = document.getElementById("results-container");
  resultsContainer.innerHTML = ""; // Clear previous results
  
  // Generate HTML for each question result
  for (let questionID in questionResults) {
    console.log(questionResults[questionID]);
    let resultText = questionResults[questionID] === true ? "correct" : "incorrect";
    let resultHTML = `<div class="col-12"><p>${questionID} is ${resultText}</p></div>`;
    resultsContainer.insertAdjacentHTML("beforeend", resultHTML);
  }

  let percentageHTML = `<div class="col-12"><p>Percentage: ${percentage}%</p></div>`;
  resultsContainer.insertAdjacentHTML("beforeend", percentageHTML);
  
  // Display the results in Section 2
  document.getElementById("section2").style.display = "block";
  
  // Scroll to Section 2
  document.getElementById("section2").scrollIntoView({ behavior: "smooth" });
}