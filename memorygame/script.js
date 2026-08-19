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
const leaderboardPassword = document.getElementById('leaderboardPassword');
const passwordError = document.getElementById('passwordError');

const foodPreview = document.getElementById('foodPreview');
const foodPreviewImage = document.getElementById('foodPreviewImage');
const foodPreviewName = document.getElementById('foodPreviewName');

// One-time setup for GitHub Pages:
// 1. Open the Leaderboard and click "Create Shared Leaderboard"
// 2. Copy the ID shown
// 3. Paste it below, then upload this file again
const JSONBLOB_ID = '';
const JSONBLOB_URL = 'https://jsonblob.com/api/jsonBlob/';
const LEADERBOARD_PASSWORD = '123456';
const TOTAL_PAIRS = 20;

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

const foodNames = {
  'images/image-1.jpeg': 'Otak-Otak',
  'images/image-2.jpeg': 'Dark Carrot Cake',
  'images/image-3.jpeg': 'Bak Kut Teh',
  'images/image-4.jpeg': 'Vegetarian Pizza',
  'images/image-5.jpeg': 'Mee Rebus',
  'images/image-6.jpeg': 'Ice Kacang',
  'images/image-7.jpeg': 'Roti Prata',
  'images/image-8.jpeg': 'Fish Head Curry',
  'images/image-9.jpeg': 'Bubble Tea',
  'images/image-10.jpeg': 'Nasi Lemak',
  'images/image-11.jpeg': 'Char Kuey Teow',
  'images/image-12.jpeg': 'Laksa',
  'images/image-13.jpeg': 'Chicken Rice',
  'images/image-14.jpeg': 'Hokkien Mee',
  'images/image-15.jpeg': 'Chilli Crab',
  'images/image-16.jpeg': 'Burger',
  'images/image-17.jpeg': 'Satay',
  'images/image-18.jpeg': 'Egg Kaya Butter Toast',
  'images/image-19.jpeg': 'Wonton Noodle',
  'images/image-20.jpeg': 'Teh Tarik'
};

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

function isOpenedCard(card) {
  return card.classList.contains('flipped') || card.classList.contains('matched');
}

function positionFoodPreview(card) {
  const rect = card.getBoundingClientRect();
  const previewWidth = 300;
  const previewHeight = 350;
  let left = rect.right + 12;
  let top = rect.top;

  if (left + previewWidth > window.innerWidth - 8) {
    left = rect.left - previewWidth - 12;
  }
  if (left < 8) {
    left = 8;
  }
  if (top + previewHeight > window.innerHeight - 8) {
    top = window.innerHeight - previewHeight - 8;
  }
  if (top < 8) {
    top = 8;
  }

  foodPreview.style.left = left + 'px';
  foodPreview.style.top = top + 'px';
}

function showFoodPreview(event) {
  const card = event.currentTarget;
  if (!isOpenedCard(card)) {
    return;
  }

  const imagePath = card.dataset.value;
  foodPreviewImage.src = imagePath;
  foodPreviewName.textContent = foodNames[imagePath] || 'Unknown food';
  positionFoodPreview(card);
  foodPreview.classList.remove('hidden');
}

function hideFoodPreview() {
  foodPreview.classList.add('hidden');
}

function createCards() {
  gameBoard.innerHTML = '';
  shuffledValues = shuffle(cardValues);

  shuffledValues.forEach((value) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.addEventListener('click', flipCard);
    card.addEventListener('mouseover', showFoodPreview);
    card.addEventListener('mouseout', hideFoodPreview);

    const img = document.createElement('img');
    img.src = value;
    img.alt = foodNames[value] || 'Memory card';
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
  this.classList.add('opened');

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
      firstCard.classList.remove('opened');
      secondCard.classList.remove('flipped');
      secondCard.classList.remove('opened');
      hideFoodPreview();
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
  hideFoodPreview();
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
  hideFoodPreview();
  resetTimer();
  updatePairsDisplay();
  createCards();
}

function blobHeaders() {
  return {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };
}

function isLeaderboardConfigured() {
  return JSONBLOB_ID && JSONBLOB_ID !== 'PASTE_YOUR_ID_HERE';
}

async function fetchLeaderboard() {
  if (!isLeaderboardConfigured()) {
    throw new Error('Leaderboard is not set up yet');
  }

  const response = await fetch(JSONBLOB_URL + JSONBLOB_ID, {
    method: 'GET',
    headers: blobHeaders(),
    cache: 'no-store'
  });
  if (!response.ok) {
    throw new Error('Could not load leaderboard');
  }
  const data = await response.json();
  return Array.isArray(data) ? data : [];
}

async function saveScores(scores) {
  const response = await fetch(JSONBLOB_URL + JSONBLOB_ID, {
    method: 'PUT',
    headers: blobHeaders(),
    body: JSON.stringify(scores)
  });
  if (!response.ok) {
    throw new Error('Could not save scores');
  }
  return scores;
}

function displayScores(scores) {
  leaderboardList.innerHTML = '';

  if (!scores.length) {
    emptyLeaderboard.textContent = 'No scores yet. Finish a game to appear here.';
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

async function renderLeaderboard() {
  try {
    const scores = await fetchLeaderboard();
    displayScores(scores);
  } catch (err) {
    leaderboardList.innerHTML = '';
    emptyLeaderboard.textContent = isLeaderboardConfigured()
      ? 'Could not load the shared leaderboard. Check the JSONBLOB_ID in script.js.'
      : 'Shared leaderboard is not set up yet.';
    emptyLeaderboard.classList.remove('hidden');
  }
}

function updateSetupBox() {
  const setupBox = document.getElementById('setupBox');
  if (!setupBox) return;
  if (isLeaderboardConfigured()) {
    setupBox.classList.add('hidden');
  } else {
    setupBox.classList.remove('hidden');
  }
}

async function showLeaderboard() {
  leaderboardPassword.value = '';
  passwordError.classList.add('hidden');
  leaderboardModal.classList.remove('hidden');
  updateSetupBox();
  if (isLeaderboardConfigured()) {
    await renderLeaderboard();
  } else {
    leaderboardList.innerHTML = '';
    emptyLeaderboard.textContent = 'Create a shared leaderboard once so all GitHub Pages players share the same scores.';
    emptyLeaderboard.classList.remove('hidden');
  }
}

function hideLeaderboard() {
  leaderboardModal.classList.add('hidden');
}

async function addScore(name, timeMs) {
  const scores = await fetchLeaderboard();
  scores.push({
    name: name,
    timeMs: timeMs,
    date: new Date().toISOString()
  });
  scores.sort((a, b) => a.timeMs - b.timeMs);
  await saveScores(scores);
  return scores;
}

async function resetLeaderboardWithPassword() {
  passwordError.classList.add('hidden');

  if (leaderboardPassword.value !== LEADERBOARD_PASSWORD) {
    passwordError.classList.remove('hidden');
    leaderboardPassword.focus();
    return;
  }

  try {
    await saveScores([]);
    leaderboardPassword.value = '';
    displayScores([]);
  } catch (err) {
    emptyLeaderboard.textContent = 'Could not reset the shared leaderboard.';
    emptyLeaderboard.classList.remove('hidden');
  }
}

async function createSharedLeaderboard() {
  const newBlobId = document.getElementById('newBlobId');
  try {
    const response = await fetch(JSONBLOB_URL, {
      method: 'POST',
      headers: blobHeaders(),
      body: JSON.stringify([])
    });
    if (!response.ok) {
      throw new Error('Create failed');
    }
    const location = response.headers.get('Location') || '';
    const headerId = response.headers.get('X-jsonblob') || '';
    const idFromLocation = location.split('/').pop();
    const blobId = headerId || idFromLocation;
    if (!blobId) {
      throw new Error('No blob ID returned');
    }
    newBlobId.classList.remove('hidden');
    newBlobId.textContent = 'Copy this ID into script.js as JSONBLOB_ID, then upload the file again:\n' + blobId;
  } catch (err) {
    newBlobId.classList.remove('hidden');
    newBlobId.textContent = 'Could not create the shared file. Try again, or create one at jsonblob.com.';
  }
}

async function saveCurrentScore() {
  const name = playerNameInput.value.trim();
  if (!name) {
    playerNameInput.focus();
    playerNameInput.placeholder = 'Please enter a name';
    return;
  }

  if (!isLeaderboardConfigured()) {
    alert('Set up the shared leaderboard first: open Leaderboard, click Create Shared Leaderboard, then paste the ID into script.js.');
    await showLeaderboard();
    return;
  }

  try {
    await addScore(name, elapsedMs);
    nameModal.classList.add('hidden');
    await showLeaderboard();
  } catch (err) {
    alert('Your time could not be saved to the shared leaderboard.');
  }
}

const createBlobButton = document.getElementById('createBlobButton');
if (createBlobButton) {
  createBlobButton.addEventListener('click', createSharedLeaderboard);
}

resetButton.addEventListener('click', resetGame);
leaderboardButton.addEventListener('click', showLeaderboard);
closeLeaderboardButton.addEventListener('click', hideLeaderboard);
clearLeaderboardButton.addEventListener('click', resetLeaderboardWithPassword);
saveScoreButton.addEventListener('click', saveCurrentScore);
skipSaveButton.addEventListener('click', () => {
  nameModal.classList.add('hidden');
});

playerNameInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    saveCurrentScore();
  }
});

leaderboardPassword.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    resetLeaderboardWithPassword();
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
