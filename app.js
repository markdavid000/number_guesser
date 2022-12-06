// Game values
let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'Play-again'){
        window.location.reload();

    // clear input
    guessInput.value = '';
    }
})

// Listen for guess
guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value)

    // Validate
    if(isNaN(guess) || guess < min || guess > max){
       setMessage(`please enter a number between ${min} and ${max}`, 'red'); 
    }

    // check if won
    if(guess === winningNum){
        // Game over - won
        gameOver(true, `${winningNum} is correct, YOU WIN!`)

        // // clear input
        // guessInput.value = '';
    } else {
        // Wrong numbers
        guessesLeft -= 1;

        if(guessesLeft === 0){
            // Gama over - lost
            gameOver(false, `Game Over,you lost. The correct number was ${winningNum}`)
        } else {
            // Game continues - answer wrong

            // clear input
            guessInput.value = '';

            // Tell user it's the wrong number
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, 'red')

            // change border color
            guessInput.style.borderColor = 'red'
        }
    }
});

function gameOver(won, msg){
    let color;
    won === true ? color = 'green' : color = 'red'; 

    // Disable input
    guessInput.disabled = true;

    // change border color
    guessInput.style.borderColor =  color;

    // set text color
    message.style.color = color;

    // Set message
    setMessage(msg)

    // Play again?
    guessBtn.value = 'Play Again'
    guessBtn.className += 'Play-again'

    // // clear input
    // guessInput.value = '';
}

// Get winning Number
function getRandomNum(min, max){
    return (Math.floor(Math.random()*(max-min+1)+min))
}

// Set message
function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}