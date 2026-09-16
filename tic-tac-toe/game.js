const WINNING_LINES = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const SCORES_STORAGE_KEY = 'tic-tac-toe-scores';
const MAX_SCORE = Number.MAX_SAFE_INTEGER;

function emptyScores() {
  return { X: 0, O: 0, draws: 0 };
}

function isValidScore(value) {
  return Number.isSafeInteger(value) && value >= 0 && value <= MAX_SCORE;
}

function loadScores(storage) {
  const scores = emptyScores();
  if (!storage) return scores;

  try {
    const saved = JSON.parse(storage.getItem(SCORES_STORAGE_KEY));
    for (const key of Object.keys(scores)) {
      if (saved && isValidScore(saved[key])) scores[key] = saved[key];
    }
  } catch (error) {
    return scores;
  }
  return scores;
}

function saveScores(storage, scores) {
  if (!storage) return;
  try {
    storage.setItem(SCORES_STORAGE_KEY, JSON.stringify(scores));
  } catch (error) {
    // Score persistence is optional when browser storage is unavailable.
  }
}

function removeSavedScores(storage) {
  if (!storage) return;
  try {
    storage.removeItem(SCORES_STORAGE_KEY);
  } catch (error) {
    // Score persistence is optional when browser storage is unavailable.
  }
}

function checkWinner(board) {
  for (const [a, b, c] of WINNING_LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line: [a, b, c] };
    }
  }
  if (board.every(Boolean)) return { draw: true };
  return null;
}

function cellLabel(index, mark) {
  const row = Math.floor(index / 3) + 1;
  const col = (index % 3) + 1;
  const base = `Row ${row}, Column ${col}`;
  return mark ? `${base}, ${mark}` : base;
}

if (typeof document !== 'undefined') {
  let board = Array(9).fill(null);
  let currentPlayer = 'X';
  let gameOver = false;
  let storage = null;
  try {
    storage = localStorage;
  } catch (error) {
    // Score persistence is optional when browser storage is unavailable.
  }
  let scores = loadScores(storage);

  const cells = document.querySelectorAll('.cell');
  const statusEl = document.getElementById('status');
  const scoreX = document.getElementById('score-x');
  const scoreO = document.getElementById('score-o');
  const scoreDraws = document.getElementById('score-draws');
  const resetBtn = document.getElementById('reset-btn');
  const clearScoresBtn = document.getElementById('clear-scores-btn');

  function handleClick(e) {
    const index = Number(e.target.dataset.index);
    if (gameOver || board[index]) return;

    board[index] = currentPlayer;
    const cell = cells[index];
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    cell.setAttribute('aria-label', cellLabel(index, currentPlayer));
    cell.disabled = true;

    const result = checkWinner(board);

    if (result) {
      gameOver = true;
      if (result.winner) {
        statusEl.textContent = `Player ${result.winner} wins! 🎉`;
        if (scores[result.winner] < MAX_SCORE) scores[result.winner]++;
        result.line.forEach(i => cells[i].classList.add('winning'));
      } else {
        statusEl.textContent = "It's a draw!";
        scores.draws++;
      }
      updateScores();
      saveScores(storage, scores);
      cells.forEach(c => (c.disabled = true));
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusEl.textContent = `Player ${currentPlayer}'s turn`;
    }
  }

  function updateScores() {
    scoreX.textContent = scores.X;
    scoreO.textContent = scores.O;
    scoreDraws.textContent = scores.draws;
  }

  function resetGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    gameOver = false;
    statusEl.textContent = "Player X's turn";
    cells.forEach((cell, i) => {
      cell.textContent = '';
      cell.className = 'cell';
      cell.setAttribute('aria-label', cellLabel(i, null));
      cell.disabled = false;
    });
  }

  function clearScores() {
    scores = emptyScores();
    removeSavedScores(storage);
    updateScores();
    resetGame();
  }

  cells.forEach(cell => cell.addEventListener('click', handleClick));
  resetBtn.addEventListener('click', resetGame);
  clearScoresBtn.addEventListener('click', clearScores);
}

if (typeof module !== 'undefined') {
  module.exports = { checkWinner, loadScores, saveScores, removeSavedScores };
}
