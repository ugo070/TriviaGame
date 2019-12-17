$(document).ready(function() {
  //hide html before trivia start
  $(".exam").hide();
  $(".results-container").hide();

  //intitalize clock variables
  let time;
  let intervalId;

  function startClock() {
    time = 120;
    $(".seconds").text(time);
    intervalId = setInterval(count, 1000);
  }

  function stopClock() {
    clearInterval(intervalId);
  }

  // function to tick down the time
  function count() {
    time--;
    $(".seconds").text(time);
    if (time === 0) {
      endExam();
    }
  }

  function startExam() {
    $(".exam").show();
    $(".start-container").hide();

    startClock();
  }
  let correctAnswers = 0;
  let incorrectAnswers = 0;
  let unansweredQuestions = 0;
  $(".start-btn").click(startExam);
  $(".restart-btn").click(function() {
    location.reload();
  });
  //these are the element id's of the correct answers
  const answerKey = ["#q1o4", "#q2o1", "#q3o3", "#q4o2"];

  const questionNumbers = ["one", "two", "three", "four"];

  // this will tally up correct answers, incorrect answers, and unanswered questions
  function submitAnswers() {
    for (i = 0; i < answerKey.length; i++) {
      let correctAnswerSelected = $(answerKey[i]).is(":checked");
      let questionAnswered = $(
        '[name="question-' + questionNumbers[i] + '"]'
      ).is(":checked");
      if (correctAnswerSelected === true) {
        correctAnswers++;
      }
      if (questionAnswered === true && correctAnswerSelected === false) {
        incorrectAnswers++;
      }
      if (questionAnswered === false) {
        unansweredQuestions++;
      }
    }
  }

  // displays results in DOM
  function displayResults() {
    $(".correct-answers").text(correctAnswers);
    $(".incorrect-answers").text(incorrectAnswers);
    $(".unanswered-questions").text(unansweredQuestions);
  }

  // only show ending page HTML, not exam
  function showEndingPage() {
    $(".exam").hide();
    $(".results-container").show();
  }

  function endExam() {
    stopClock();
    submitAnswers();
    displayResults();
    showEndingPage();
  }

  $(".last-button").click(endExam);
});
