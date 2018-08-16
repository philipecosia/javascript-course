/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// Global variables
let scores, roundScore, activePlayer, gamePlaying;

// Run the init function
init();

// Roll the dice
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // Random number from 1 to 6
        let dice0 = Math.floor(Math.random() * 6 + 1);
        let dice1 = Math.floor(Math.random() * 6 + 1);

        // Display dice role result
        let diceDOM0 = document.getElementById('dice-0');
        let diceDOM1 = document.getElementById('dice-1');
        diceDOM0.style.display = 'block';
        diceDOM1.style.display = 'block';
        diceDOM0.src = 'dice-' + dice0 + '.png';
        diceDOM1.src = 'dice-' + dice1 + '.png';

        // Update round score if role is not 1 or two 6 roles in a row
        if (dice0 !== 1 && dice1 !== 1) {
            // Add and display total new round score
            roundScore += dice0 + dice1;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
            // Save dice role to previous dice
            //console.log('New roll: ' + dice + '. Prev roll: ' + previousDice);
            previousDice = dice0;
        } else {
            // Next players turn
            //console.log('New roll: ' + dice + '. Prev roll: ' + previousDice + '. Rolled a 1!');
            nextPlayer();
        }
    }
});

// Hold = save score and switch to next player
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add current score to global score
        scores[activePlayer] += roundScore;
        roundScore = 0;

        // Update the UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];
        document.getElementById('current-' + activePlayer).textContent = roundScore;

        // Check if player won the game
        let winningScore = document.getElementById('winningscore').value || 100;

        if (scores[activePlayer] >= winningScore) {
            // Active player won the game
            gamePlaying = false;

            let playerPanelDOM = document.querySelector('.player-' + activePlayer + '-panel');
            
            // Update the UI
            playerPanelDOM.classList.remove('active');
            playerPanelDOM.classList.add('winner');
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-0').style.display = 'none';
            document.getElementById('dice-1').style.display = 'none';
            
            // Hide roll and hold buttons until new game is started
            document.querySelector('.btn-roll').style.display = 'none';
            document.querySelector('.btn-hold').style.display = 'none';

        } else {
            // Next players turn
            nextPlayer();
        }
    }
});

// Run init function when new game button is clicked
document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    // (Re)set variables
    gamePlaying = true;
    scores = [0,0];
    roundScore = 0;
    previousDice = 0;
    // Random first player
    activePlayer = Math.round(Math.random());

    // Get player names
    //let player0Name = prompt('Name of player 1?', 'Player1') || 'Player 1';
    //let player1Name = prompt('Name of player 2?', 'Player2') || 'Player 2';
    let player0Name = 'Player 1';
    let player1Name = 'Player 2';

    // Initially hide the dice icon and set values to 0
    document.getElementById('dice-0').style.display = 'none';
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    // Remove potential winner and active styling/content from prev game
    document.getElementById('name-0').textContent = player0Name;
    document.getElementById('name-1').textContent = player1Name;
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    // Show the roll and hold buttons
    document.querySelector('.btn-roll').style.display = 'block';
    document.querySelector('.btn-hold').style.display = 'block';

    // Set active class
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
}

function nextPlayer() {
    // Set round score of current player to 0 and reset previous roll variable
    roundScore = 0;
    document.getElementById('current-' + activePlayer).textContent = roundScore;

    // Remove active player styling from current player
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

    // Switch current player to other player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    // Add active player styling to current player
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');

    // Hide the dice icons
    document.getElementById('dice-0').style.display = 'none';
    document.getElementById('dice-1').style.display = 'none';
};


/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/