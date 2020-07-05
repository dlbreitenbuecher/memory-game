// Select all cards
const cards = document.querySelectorAll('.card');
// We will use this variable to track if a card is the first or second card to flip in a pair
let firstClick = false;
let firstCard, secondCard;
// Condition used to allow only one set of cards to be turned over at a time
let boardFreeze = false;

// Scoreboard Variables
const scoreBoard = document.getElementById('score-display');
let currentScore = 0;
let reportedScore = document.createElement('h2');
reportedScore.setAttribute('id', 'score');
reportedScore.innerText = currentScore;
scoreBoard.appendChild(reportedScore);

// Shuffle Cards When Game Refreshes
(function shuffle(){
    cards.forEach((card) => {
        let val = Math.floor(Math.random()*16);
        card.style.order = val;
    })
})();

// Loops through cards with event listener; card flips if clicked
for(let i=0; i<cards.length; i++){
    cards[i].addEventListener('click', flip);
}

function flip(){
    // If boardFreeze is true, this means that one set of cards is already active and the function call ends
    if(boardFreeze) return;

    // Prevents selecting one card twice from counting as a match
    if(this === firstCard) return;

    // this refers to the element that was clicked on
    // The class 'flip' is added to the card that was clicked on
    this.classList.add('flip');

    if(!firstClick) {
        firstClick = true;
        firstCard = this;
        document.getElementById('score').innerText = ++currentScore;

        // We return because there are no other actions to take at this time
        return;
    } else {
        // Reset firstClick for the next turn;
        firstClick = false;
        secondCard = this;
        document.getElementById('score').innerText = ++currentScore;

        // console.log(this, firstCard.dataset.name);
        // console.log(this, secondCard.dataset.name);

        // Run function to determine if cards match
        checkMatch(firstCard.dataset.name, secondCard.dataset.name);
    }
}


// If the cards match, then the event listener will be removed so that they cannot be flipped over again. 
// If the cards do not match, the cards will be displayed briefly before flipping back automatically
function checkMatch(cardData1, cardData2){
    if(cardData1 === cardData2){
        firstCard.removeEventListener('click', flip);
        secondCard.removeEventListener('click', flip);
        reset();
    } else {
        freezeThenFlipCards();
    }
}

function freezeThenFlipCards(){
    // The cards are not the same, and are frozen briefly. During this time, boardFreeze is set to true to prevent other cards from being flipped
    boardFreeze = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        // After time passes, boardFreeze set to false to allow a new set of cards to be chosen
        reset();
    }, 1000);
}

// Reset Variables for next turn
function reset(){
    boardFreeze = false;
    firstClick = false;
    firstCard = null;
    secondCard = null;
}

// Title Colors:
// Order of marioColors = rich electric blue, cyber yellow, lust(red), american green

(function titleColors(){
    let marioColors = ['#049CD8', '#FBD000', '#E52521', '#43B047'];
    let title = document.querySelectorAll('.letters');
    let prevChoice;
    title.forEach((letter) => {
        let choice = Math.floor(Math.random()*4);
        while(choice === prevChoice){
            choice = Math.floor(Math.random()*4);
        }
        letter.style.color = marioColors[choice];
        prevChoice = choice;
    })

    // for(let i=0; i<title.length; i++){
    //     let choice = Math.floor(Math.random()*5);
    //     title[i].append('<span style='marioColors[choice]'</span>');
    // }


}
)();


// Work Cited:
// Code developed with the aid of Marina Ferreira's Tutorial
// https://www.freecodecamp.org/news/vanilla-javascript-tutorial-build-a-memory-game-in-30-minutes-e542c4447eae/ 

