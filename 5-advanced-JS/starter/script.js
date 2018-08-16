/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).

--- Expert level ---

8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)

9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.

10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).

11. Display the score in the console. Use yet another method for this.
*/

// Wrapper IIFE
(function () {

    // Constructor for questions
    function Question(question, answers, solution) {
        this.question = question;
        this.answers = answers; // array
        this.solution = solution;
    };
    
    // Question methods
    Question.prototype.printQuestion = function() {
        console.log('Question: ' + this.question);
        for (let i = 0; i < this.answers.length; i++) {
            console.log(i + ': ' + this.answers[i]);
        }
    }
    
    Question.prototype.checkAnswer = function(answer) {
        if (this.solution === answer) {
            console.log('Correct!');
            countScore(true);
        } else {
            console.log('Wrong. You entered: ' + answer + '. The correct answer is ' + this.solution + ': ' + this.answers[this.solution] );
            countScore(false);
        }
    }
    
    // Define questions
    let q0 = new Question('Who was the legendary Benedictine monk who invented champagne?', ['Don Marxim', 'Don Perignon', 'Don Boheme'], 1);
    let q1 = new Question('Where would you find the Sea of Tranquility?', ['Moon', 'Japan', 'Sweden'], 0);
    let q2 = new Question('How many valves does a trumpet have?', ['3', '1', '5'], 0);
    
    let questions = [q0, q1, q2];

    // Print a random question
    function printRandQuestion() {
        let r = Math.floor(Math.random() * questions.length);
        questions[r].printQuestion();
        return r;
    }
    
    // Prompt for answer as long as user does not enter 'exit' and check answer
    function promptAnswer() {
        r = printRandQuestion();
        let answer = prompt('Whats the correct answer?');

        // Check if player wants to exit
        if (answer !== 'exit') {

            // Check answer and display result plus total score, then start again
            questions[r].checkAnswer(parseInt(answer));
            promptAnswer();

        }
    }

    // Count and display score
    function scoreClosure() {
        let score = 0;
        return function (correct) { 
            if (correct) score++;
            console.log('Score: ' + score);
            console.log('-----------------------------');
        }
    }
    let countScore = scoreClosure();

    // Init
    promptAnswer();

})();
