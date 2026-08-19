// script.js
const gameBoard = document.getElementById('game-board');
const resetButton = document.getElementById('resetButton');
const leaderboardButton = document.getElementById('leaderboardButton');
const timerDisplay = document.getElementById('timerDisplay');
const pairsDisplay = document.getElementById('pairsDisplay');

const nameModal = document.getElementById('nameModal');
const finalTimeText = document.getElementById('finalTimeText');
const playerNameInput = document.getElementById('playerName');
const saveScoreButton = document.getElementById('saveScoreButton');
const skipSaveButton = document.getElementById('skipSaveButton');

const leaderboardModal = document.getElementById('leaderboardModal');
const leaderboardList = document.getElementById('leaderboardList');
const emptyLeaderboard = document.getElementById('emptyLeaderboard');
const closeLeaderboardButton = document.getElementById('closeLeaderboardButton');
const clearLeaderboardButton = document.getElementById('clearLeaderboardButton');

const STORAGE_KEY = 'memoryGameLeaderboard';
const TOTAL_PAIRS = 20;
const MAX_SCORES = 10;

const cardValues = [
  'images/image-1.jpeg', 'images/image-2.jpeg', 'images/image-3.jpeg', 'images/image-4.jpeg', 'images/image-5.jpeg',
  'images/image-6.jpeg', 'images/image-7.jpeg', 'images/image-8.jpeg', 'images/image-9.jpeg', 'images/image-10.jpeg',
  'images/image-11.jpeg', 'images/image-12.jpeg', 'images/image-13.jpeg', 'images/image-14.jpeg', 'images/image-15.jpeg',
  'images/image-16.jpeg', 'images/image-17.jpeg', 'images/image-18.jpeg', 'images/image-19.jpeg', 'images/image-20.jpeg',
  'images/image-1.jpeg', 'images/image-2.jpeg', 'images/image-3.jpeg', 'images/image-4.jpeg', 'images/image-5.jpeg',
  'images/image-6.jpeg', 'images/image-7.jpeg', 'images/image-8.jpeg', 'images/image-9.jpeg', 'images/image-10.jpeg',
  'images/image-11.jpeg', 'images/image-12.jpeg', 'images/image-13.jpeg', 'images/image-14.jpeg', 'images/image-15.jpeg',
  'images/image-16.jpeg', 'images/image-17.jpeg', 'images/image-18.jpeg', 'images/image-19.jpeg', 'images/image-20.jpeg'
];

let shuffledValues = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
let gameComplete = false;

let timerInterval = null;
let timerRunning = false;
let startTime = 0;
let elapsedMs = 0;

function shuffle(array) {
  const copy = array.slice();
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return String(minutes).padStart(2, '0') + ':' + String(seconds).padStart(2, '0');
}

function updateTimerDisplay() {
  if (timerRunning) {
    elapsedMs = Date.now() - startTime;
  }
  timerDisplay.textContent = formatTime(elapsedMs);
}

function startTimer() {
  if (timerRunning || gameComplete) return;
  timerRunning = true;
  startTime = Date.now() - elapsedMs;
  timerInterval = setInterval(updateTimerDisplay, 200);
}

function stopTimer() {
  if (timerRunning) {
    elapsedMs = Date.now() - startTime;
    timerRunning = false;
  }
  clearInterval(timerInterval);
  timerInterval = null;
  updateTimerDisplay();
}

function resetTimer() {
  stopTimer();
  elapsedMs = 0;
  startTime = 0;
  updateTimerDisplay();
}

function updatePairsDisplay() {
  pairsDisplay.textContent = matchedPairs + ' / ' + TOTAL_PAIRS;
}

function createCards() {
  gameBoard.innerHTML = '';
  shuffledValues = shuffle(cardValues);

  shuffledValues.forEach((value) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.addEventListener('click', flipCard);

    const img = document.createElement('img');
    img.src = value;
    img.alt = 'Memory card';
    card.appendChild(img);

    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard || gameComplete || this === firstCard || this.classList.contains('matched')) {
    return;
  }

  startTimer();
  this.classList.add('flipped');

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkMatch();
}

function checkMatch() {
  lockBoard = true;

  if (firstCard.dataset.value === secondCard.dataset.value) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedPairs += 1;
    updatePairsDisplay();
    resetTurn();

    if (matchedPairs === TOTAL_PAIRS) {
      finishGame();
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function finishGame() {
  gameComplete = true;
  stopTimer();
  finalTimeText.textContent = 'Your time: ' + formatTime(elapsedMs);
  playerNameInput.value = '';
  nameModal.classList.remove('hidden');
  playerNameInput.focus();
}

function resetGame() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  matchedPairs = 0;
  gameComplete = false;
  nameModal.classList.add('hidden');
  resetTimer();
  updatePairsDisplay();
  createCards();
}

function getLeaderboard() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data = raw ? JSON.parse(raw) : [];
    return Array.isArray(data) ? data : [];
  } catch (err) {
    return [];
  }
}

function saveLeaderboard(scores) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
}

function addScore(name, timeMs) {
  const scores = getLeaderboard();
  scores.push({
    name: name,
    timeMs: timeMs,
    date: new Date().toISOString()
  });
  scores.sort((a, b) => a.timeMs - b.timeMs);
  saveLeaderboard(scores.slice(0, MAX_SCORES));
}

function renderLeaderboard() {
  const scores = getLeaderboard();
  leaderboardList.innerHTML = '';

  if (scores.length === 0) {
    emptyLeaderboard.classList.remove('hidden');
    return;
  }

  emptyLeaderboard.classList.add('hidden');
  scores.forEach((score) => {
    const item = document.createElement('li');
    const timeSpan = document.createElement('span');
    timeSpan.className = 'time';
    timeSpan.textContent = formatTime(score.timeMs);
    item.appendChild(document.createTextNode(score.name + ' '));
    item.appendChild(timeSpan);
    leaderboardList.appendChild(item);
  });
}

function showLeaderboard() {
  renderLeaderboard();
  leaderboardModal.classList.remove('hidden');
}

function hideLeaderboard() {
  leaderboardModal.classList.add('hidden');
}

function saveCurrentScore() {
  const name = playerNameInput.value.trim();
  if (!name) {
    playerNameInput.focus();
    playerNameInput.placeholder = 'Please enter a name';
    return;
  }

  addScore(name, elapsedMs);
  nameModal.classList.add('hidden');
  showLeaderboard();
}

resetButton.addEventListener('click', resetGame);
leaderboardButton.addEventListener('click', showLeaderboard);
closeLeaderboardButton.addEventListener('click', hideLeaderboard);
clearLeaderboardButton.addEventListener('click', () => {
  if (confirm('Clear all leaderboard scores?')) {
    saveLeaderboard([]);
    renderLeaderboard();
  }
});
saveScoreButton.addEventListener('click', saveCurrentScore);
skipSaveButton.addEventListener('click', () => {
  nameModal.classList.add('hidden');
});

playerNameInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    saveCurrentScore();
  }
});

nameModal.addEventListener('click', (event) => {
  if (event.target === nameModal) {
    nameModal.classList.add('hidden');
  }
});

leaderboardModal.addEventListener('click', (event) => {
  if (event.target === leaderboardModal) {
    hideLeaderboard();
  }
});

resetGame();
