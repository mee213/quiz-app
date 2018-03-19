'use strict';

// global variables used intentionally
let counter = 0;
let score = 0;
let correct = false;

const questionsAndAnswers = [
    
    { question: "Where did Jim & Pam get married?", 
      answers: 
        [
            "Niagara Falls", 
            "Scranton", 
            "Philadelphia", 
            "New York City"
        ],
      correct: "Niagara Falls"
    }, 

    { question: "What did Jim do when Pam accidentally tore her veil on their wedding day?", 
      answers: 
        [
            "He cut his tie", 
            "He postponed the wedding", 
            "He tore his sleeve", 
            "He sewed it back together for her"
        ],
      correct: "He cut his tie"
    }, 

    { question: "What is the name of Michael Scott’s movie?", 
      answers: 
        [
            "Threat Level Midnight", 
            "Michael Scarn’s Big Adventure", 
            "Paperchasers: a Dunder-Mifflin Documentary", 
            "Somehow I Manage"
        ],
      correct: "Threat Level Midnight"
    }, 

    { question: "According to Michael Scott, where is the special filing cabinet where all faxes from Corporate should be filed?", 
      answers: 
        [
            "in the trash can", 
            "in the accounting department", 
            "in Creed’s desk", 
            "in the Annex"
        ],
      correct: "in the trash can"
    },

    { question: "In his spare time, Dwight...", 
      answers: 
        [
            "is a beet farmer", 
            "rides in a motorcycle club", 
            "collects vinyl records", 
            "plays ice hockey"
        ],
      correct: "is a beet farmer"
    },

    { question: "Meredith got hit by a car. Who was driving?", 
      answers: 
        [
            "Michael", 
            "Dwight", 
            "Creed", 
            "Ryan"
        ],
      correct: "Michael"
    },

    { question: "Who started the fire at Dunder-Mifflin?", 
      answers: 
        [
            "Ryan", 
            "Darryl", 
            "Nellie", 
            "Holly"
        ],
      correct: "Ryan"
    },

    { question: "Which branch of Dunder-Mifflin was Holly transferred to when she left Scranton?", 
      answers: 
        [
            "Nashua", 
            "Utica", 
            "Stamford", 
            "Buffalo"
        ],
      correct: "Nashua"
    },

    { question: "Who is Angela’s son Philip named after?", 
      answers: 
        [
            "Her cat", 
            "Her grandfather", 
            "Prince Philip", 
            "No one in particular"
        ],
      correct: "Her cat"
    },

    { question: "Scranton! What? The _________ city!", 
      answers: 
        [
            "electric", 
            "paper", 
            "windy", 
            "best"
        ],
      correct: "electric"
    }
]

// testing
console.log(questionsAndAnswers[9].answers[3]);
console.log(questionsAndAnswers[9].correct);

function shuffleTheAnswers(originalArray) {
  console.log('`shuffleTheAnswers` ran');
  for (let k = 0; k < originalArray.length; k++) {
    let i = 0;
    let j = 0;
    let temp = null;
  
    for (i = originalArray[k].answers.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1));
      temp = originalArray[k].answers[i];
      originalArray[k].answers[i] = originalArray[k].answers[j];
      originalArray[k].answers[j] = temp;
    }
  }
}

function renderQuestionPage(qAndA) {
  console.log('`renderQuestionPage` ran');
  console.log(`counter is ${counter}`);
  
  const questionPageString = generateQuestionPageString(qAndA);

  // insert that HTML into the DOM
  $('.js-page').html(questionPageString);
  
  //remove feedback from last question
  $('.js-top-feedback').html(''); 
  
  $('.js-question').submit(function(event) {
    event.preventDefault();
    console.log("clicked!");
    let answerIndex = $('input[name="question"]:checked').val();
    console.log(`qAndA[counter].answers[answerIndex] is ${qAndA[counter].answers[answerIndex]}`);
    console.log(`counter is ${counter}`);
    const thisAnswer = questionsAndAnswers[counter].answers[answerIndex];
    const correctAnswer = questionsAndAnswers[counter].correct;
    const errorMessage = `
        <div class="col-12 js-error feedback error">
          <section role="region" class="feedback" class="js-error">
            <p class="js-error">Please select an answer.</p>
          </section>
        </div>
      `;
      
    //remove error message leftover from last attempt so it's not duplicated
    $('.js-top-feedback').html('');  
      
    if (answerIndex) { 
      if (thisAnswer === correctAnswer) {
        correct = true;
      } else {
        correct = false;
      }
    } else { //error handling in case no answer is selected
      $('.js-top-feedback').html(errorMessage);
      return;
    }
      
    console.log(`correct is ${correct}`);
    console.log(`score is ${score} before update`);
    updateScore(correct);
    console.log(`score is ${score} after update`);
    renderFeedbackPage(answerIndex);
    
    console.log(`counter is ${counter}`);
  });
}

function renderFeedbackPage(ansIndex) {
  console.log('`renderFeedbackPage` ran');
  console.log(`counter is ${counter}`);
  console.log(`score is ${score}`);
  console.log(`ansIndex is ${ansIndex}`);
  console.log(`questionsAndAnswers[counter].correct is  ${questionsAndAnswers[counter].correct}`);
  console.log(`questionsAndAnswers[counter].answers[ansIndex] is  ${questionsAndAnswers[counter].answers[ansIndex]}`);
  let feedbackPageString = generateFeedbackPageString(questionsAndAnswers);
  let rightOrWrongString = "";
  
  console.log(`correct is ${correct} inside renderFeedbackPage function`);
    
  if (correct) {
    rightOrWrongString = `
      <div class="col-12 feedback right">
        <section role="region" class="feedback">
          <p>Correct!</p>
        </section>
      </div>
    `;
  } else {
    rightOrWrongString = `
      <div class="col-12 feedback wrong">
        <section role="region" class="feedback">
          <p>Incorrect! The correct answer is: ${questionsAndAnswers[counter].correct}.</p>
        </section>
      </div>
    `;
  }
  
  $('.js-page').html(feedbackPageString);
  
  $('.js-top-feedback').html(rightOrWrongString);
  
  let isLastQuestion = false;
  
  if (counter==questionsAndAnswers.length-1) {
    isLastQuestion = true;
  } else {
    isLastQuestion = false;
  }
  
  //change text on button to say 'finish' if last question completed
  if (isLastQuestion) {
    $('button').text('Finish Quiz');
  }
 
  //the user-selected radio button remains checked when loading feedback 
  $(`input[value="${ansIndex}"]`).prop("checked", true);
  
  //disable answer choices that were not selected by user
  $(`input[value="${ansIndex}"]`).siblings().prop("disabled", true);
  
  $('.js-feedback').submit(function(event) {
    event.preventDefault();
    console.log("feedback clicked!");
    counter++;
    
    console.log(`new counter is ${counter}`);
    if (counter < questionsAndAnswers.length) {
      renderQuestionPage(questionsAndAnswers);
    } else {
      renderLastPage();
    }
    
  });
  
}

function renderLastPage() {
  console.log('`renderLastPage` ran');
  const lastPageString = generateLastPageString();
  
  // insert that HTML into the DOM
  $('.js-page').html(lastPageString);
  
  //remove feedback from last question
  $('.js-top-feedback').html(''); 
}

function updateScore(itIsCorrect) {
  console.log('`updateScore` ran');
  if (itIsCorrect) {
    score++;
  } 
}

function renderFirstPage() {
  console.log('`renderFirstPage` ran');
  const firstPageString = generateFirstPageString();

  // insert that HTML into the DOM
  $('.js-page').html(firstPageString);
  
}

function generateLastPageString() {
  console.log('`generateLastPageString` ran');
  const finalScore = (score/(counter))*100;
  return `
    <div class="row">
      <div class="col-12">
        <section role="region" class="score">
          <h2>Finished!</h2>
          <p>Final score: ${score} correct ${counter-score} incorrect</p>
          <h3>${finalScore}%</h3>
        </section>
      </div>
    </div>
    
    <form class="js-finish">  
      <div class="row">
        <div class="col-12">
          <section role="region" class="button">
            <button type="submit">Play Again!</button>
          </section>
        </div>
      </div>
    </form>`;
}

function generateFeedbackPageString(CueAndA) {
  console.log('`generateFeedbackPageString` ran');
  return `
    <div class="row">
      <div class="col-12">
        <section role="region" class="status">
          <p>Question ${counter+1} of 10:</p>
        </section>
      </div>
    </div>
    
    <form class="js-feedback">
      <div class="row">
        <div class="col-12">
          <section role="region" class="question">
            <h2>${CueAndA[counter].question}</h2>
          </section>
        </div>
      </div>
      
      <div class="row">
        <div class="col-12">
          <section role="region" class="answers">
            <input type="radio" name="question" id="answer-1" value="0"><label for="answer-1"> ${CueAndA[counter].answers[0]}</label>
            <br>
            <input type="radio" name="question" id="answer-2" value="1"><label for="answer-2"> ${CueAndA[counter].answers[1]}</label>
            <br>
            <input type="radio" name="question" id="answer-3" value="2"><label for="answer-3"> ${CueAndA[counter].answers[2]}</label>
            <br>
            <input type="radio" name="question" id="answer-4" value="3"><label for="answer-4"> ${CueAndA[counter].answers[3]}</label>
          </section>
        </div>
      </div>
      
      <div class="row">
        <div class="col-12">
          <section role="region" class="button">
            <button type="submit">Continue to Next Question</button>
          </section>
        </div>
      </div>
    </form>
    
    <div class="row">
      <div class="col-12">
        <section role="region" class="score">
          <p>Score: ${score} correct ${counter+1-score} incorrect</p>
        </section>
      </div>
    </div>
  `
}

function generateQuestionPageString(CueAndA) {
  console.log('`generateQuestionPageString` ran');
  return `
    <div class="row">
      <div class="col-12">
        <section role="region" class="status">
          <p>Question ${counter+1} of 10:</p>
        </section>
      </div>
    </div>
    
    <form class="js-question">
      <div class="row">
        <div class="col-12">
          <section role="region" class="question">
            <h2>${CueAndA[counter].question}</h2>
          </section>
        </div>
      </div>
      
      <div class="row">
        <div class="col-12">
          <section role="region" class="answers">
            <input type="radio" name="question" id="answer-1" value="0" ><label for="answer-1"> ${CueAndA[counter].answers[0]}</label>
            <br>
            <input type="radio" name="question" id="answer-2" value="1"><label for="answer-2"> ${CueAndA[counter].answers[1]}</label>
            <br>
            <input type="radio" name="question" id="answer-3" value="2"><label for="answer-3"> ${CueAndA[counter].answers[2]}</label>
            <br>
            <input type="radio" name="question" id="answer-4" value="3"><label for="answer-4"> ${CueAndA[counter].answers[3]}</label>
          </section>
        </div>
      </div>
      
      <div class="row">
        <div class="col-12">
          <section role="region" class="button">
            <button type="submit">Submit</button>
          </section>
        </div>
      </div>
    </form>
    
    <div class="row">
      <div class="col-12">
        <section role="region" class="score">
          <p>Score: ${score} correct ${counter-score} incorrect</p>
        </section>
      </div>
    </div>`
}

function generateFirstPageString() {
  console.log('`generateFirstPageString` ran');
  return `
    <form class="js-start">  
      <div class="row">
        <div class="col-12">
          <section role="region" class="button">
            <button type="submit">Click to Start</button>
          </section>
        </div>
      </div>
    </form>`;
}

function handleQuestionPages(arrayOfQandA) {
  renderQuestionPage(arrayOfQandA, counter);
}

function handleStartButton() {
  $('.js-start').submit(function(event) {
    event.preventDefault();
    console.log('`handleStartButton` ran');
    handleQuestionPages(questionsAndAnswers);
  });
}

function handleQuizApp() {
  console.log('`handleQuizApp` ran');
  shuffleTheAnswers(questionsAndAnswers);
  renderFirstPage();
  handleStartButton();
}

// when the page loads, call `handleQuizApp`
$(handleQuizApp);