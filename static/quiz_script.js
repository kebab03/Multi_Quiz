$(document).ready(function () {
    let currentQuestion = 0;
    let score = 0;
    let quizData = [];

    const qsLabel = $('#question');
    const choiceBtns = [$('#choice1'), $('#choice2'), $('#choice3'), $('#choice4')]; // Adjust these selectors based on your HTML structure
    const feedbackLabel = $('#feedback');
    const scoreLabel = $('#score');
    const nextBtn = $('#nextBtn');

    // Fetch quiz data from JSON file
    fetch('static/quiz.json')
        .then(response => response.json()) // Parse the JSON data
        .then(data => {
            // Store the fetched data in the quizData array
            quizData = data;
            console.log(data)
            showQuestion(currentQuestion); // Show the first question after data is fetched
        })
        .catch(error => {
            // Handle any errors that occurred during fetching or parsing
            console.error('Error fetching or parsing the JSON file:', error);
        });

    function showQuestion(index) {
        const question = quizData[index];
        qsLabel.text(question.question);
console.log('showQuestion')
        const choices = question.choices;
        for (let i = 0; i < choices.length; i++) {
        console.log('choices='+ choices[i])
            choiceBtns[i].text(choices[i]);
            choiceBtns[i].prop('disabled', false); // Reset button state
            console.log("choices[i]= "+ choices[i])
            choiceBtns[i].data('choice', choices[i]); // Set choice data attribute
        }

        feedbackLabel.text("");
        nextBtn.prop('disabled', true);
    }
function isChoiceSelected() {
console.log('isChoiceSelected')
    // Loop through the choice buttons
    for (let i = 0; i < choiceBtns.length; i++) {
        if (choiceBtns[i].hasClass('selected')) {
            // A choice has been selected
            return true;
        }
    }
    // No choice has been selected
    return false;
}
isChoiceSelected()
$('#nextBtn').on('click', function () {
    // Check if a choice has been selected
    if (isChoiceSelected()) {
        // If a choice is selected, proceed to the next question
        nextQuestion();
    } else {
        // If no choice is selected, show an alert or handle it accordingly
        alert('Please select an answer before moving to the next question.');
        // You might add further handling here, like preventing progression without a selection
    }
});

    function checkAnswer(choice) {
        const question = quizData[currentQuestion];
        const correctAnswer = question.answer;

        if (choice === correctAnswer) {
            score++; // Increase score for correct answer
            feedbackLabel.text("Correct!");
        } else {
            feedbackLabel.text("Wrong answer!");
        }

        scoreLabel.text(`Score: ${score}`); // Update score display

        // Disable choice buttons and enable next button
        choiceBtns.forEach(btn => btn.prop('disabled', true));
        nextBtn.prop('disabled', false);
    }

    function nextQuestion() {
        currentQuestion++;
        if (currentQuestion < quizData.length) {
            showQuestion(currentQuestion); // Show next question
        } else {
            // Quiz ends, display score or take necessary action
            alert(`Quiz ends! Your score is: ${score}`);
            // You can reset the quiz or perform any other action here
        }
    }

    // Event listener for choice button clicks
    choiceBtns.forEach(btn => {
        btn.on('click', function () {
            let choice = $(this).data('choice');
            checkAnswer(choice);
        });
    });

    // Event listener for next button click
    $('#nextBtn').on('click', function () {
        nextQuestion();
    });
});
