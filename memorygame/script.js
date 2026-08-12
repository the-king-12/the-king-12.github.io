// script.js
const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('resetButton');

// Array of card values (pairs)
const cardValues = [ //step 1
  'images/image-1.jpeg', 'images/image-2.jpeg', 'images/image-3.jpeg', 'images/image-4.jpeg','images/image-5.jpeg',
  'images/image-6.jpeg', 'images/image-7.jpeg', 'images/image-8.jpeg', 'images/image-9.jpeg','images/image-10.jpeg',
  'images/image-11.jpeg', 'images/image-12.jpeg', 'images/image-13.jpeg', 'images/image-14.jpeg','images/image-15.jpeg',
  'images/image-16.jpeg', 'images/image-17.jpeg', 'images/image-18.jpeg','images/image-19.jpeg','images/image-20.jpeg',

'images/image-1.jpeg', 'images/image-2.jpeg', 'images/image-3.jpeg', 'images/image-4.jpeg','images/image-5.jpeg',
  'images/image-6.jpeg', 'images/image-7.jpeg', 'images/image-8.jpeg', 'images/image-9.jpeg','images/image-10.jpeg',
  'images/image-11.jpeg', 'images/image-12.jpeg', 'images/image-13.jpeg', 'images/image-14.jpeg','images/image-15.jpeg',
  'images/image-16.jpeg', 'images/image-17.jpeg', 'images/image-18.jpeg','images/image-19.jpeg', 'images/image-20.jpeg'


];
let shuffledValues = shuffle(cardValues);

// Variables to store the current state of the game
let firstCard = null;
let secondCard = null;
let lockBoard = false;

// Shuffle the array of card values
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap elements
  }
  return array;
}

// Create the card elements
function createCards() {
  gameBoard.innerHTML = ''; // Clear any existing cards
  shuffledValues = shuffle(cardValues); // Shuffle the values again

  shuffledValues.forEach((value, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.addEventListener('click', flipCard);

    const img = document.createElement('img');
    img.src = value;
    card.appendChild(img);




    gameBoard.appendChild(card);
  });
}

// Handle card flip
function flipCard() {
  if (lockBoard || this === firstCard) return; // Prevent clicking while checking cards or clicking same card

  this.classList.add('flipped');
  

  if (!firstCard) {
    // First card clicked
    firstCard = this;
  } else {
    // Second card clicked
    secondCard = this;
    checkMatch();
  }
}

// Check if the two flipped cards match
function checkMatch() {
  lockBoard = true; // Lock the board while checking

  if (firstCard.dataset.value === secondCard.dataset.value) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
  } else {
    // If no match, flip cards back after a short delay
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      
      resetBoard();
    }, 1000);
  }
}

// Reset the board for the next turn
function resetBoard() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

// Add functionality to the reset button
resetButton.addEventListener('click', resetGame);

// Reset the game by clearing the board and shuffling cards
function resetGame() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  shuffledValues = shuffle(cardValues); // Reshuffle the cards
  createCards(); // Recreate the cards on the game board
}

// Start the game by creating cards
createCards();
