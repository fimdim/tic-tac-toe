const assert = require('node:assert/strict');
const {
  checkWinner,
  loadScores,
  saveScores,
  removeSavedScores
} = require('../tic-tac-toe/game.js');

const scoresStorageKey = 'tic-tac-toe-scores';

function createStorage(value = null) {
  let storedValue = value;
  return {
    getItem() {
      return storedValue;
    },
    setItem(key, nextValue) {
      assert.equal(key, scoresStorageKey);
      storedValue = nextValue;
    },
    removeItem(key) {
      assert.equal(key, scoresStorageKey);
      storedValue = null;
    },
    get value() {
      return storedValue;
    }
  };
}

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

for (const player of ['X', 'O']) {
  for (const line of winningLines) {
    const board = Array(9).fill(null);
    line.forEach(index => {
      board[index] = player;
    });
    assert.deepEqual(checkWinner(board), { winner: player, line });
  }
}

assert.deepEqual(
  checkWinner(['X', 'O', 'X', 'X', 'O', 'O', 'O', 'X', 'X']),
  { draw: true }
);
assert.equal(checkWinner(Array(9).fill(null)), null);
assert.equal(checkWinner(['X', 'O', null, null, null, null, null, null, null]), null);

const board = ['X', 'O', null, null, 'X', null, null, null, null];
const originalBoard = [...board];
checkWinner(board);
assert.deepEqual(board, originalBoard);

assert.deepEqual(loadScores(), { X: 0, O: 0, draws: 0 });
assert.deepEqual(loadScores(createStorage()), { X: 0, O: 0, draws: 0 });
assert.deepEqual(
  loadScores(createStorage(JSON.stringify({ X: 2, O: 4, draws: 1 }))),
  { X: 2, O: 4, draws: 1 }
);
assert.deepEqual(loadScores(createStorage('{malformed json')), { X: 0, O: 0, draws: 0 });
assert.deepEqual(
  loadScores(createStorage(JSON.stringify({
    X: -1,
    O: 1.5,
    draws: '2'
  }))),
  { X: 0, O: 0, draws: 0 }
);
assert.deepEqual(
  loadScores(createStorage(JSON.stringify({
    X: Number.MAX_SAFE_INTEGER,
    O: Number.NaN,
    draws: Number.POSITIVE_INFINITY
  }))),
  { X: Number.MAX_SAFE_INTEGER, O: 0, draws: 0 }
);
assert.deepEqual(
  loadScores(createStorage(JSON.stringify({ X: Number.MAX_SAFE_INTEGER + 1 }))),
  { X: 0, O: 0, draws: 0 }
);

const storage = createStorage();
saveScores(storage, { X: 3, O: 2, draws: 5 });
assert.equal(storage.value, JSON.stringify({ X: 3, O: 2, draws: 5 }));
removeSavedScores(storage);
assert.equal(storage.value, null);

assert.deepEqual(loadScores({
  getItem() {
    throw new Error('storage unavailable');
  }
}), { X: 0, O: 0, draws: 0 });
assert.doesNotThrow(() => saveScores({
  setItem() {
    throw new Error('storage unavailable');
  }
}, { X: 1, O: 2, draws: 3 }));
assert.doesNotThrow(() => removeSavedScores({
  removeItem() {
    throw new Error('storage unavailable');
  }
}));

console.log('All tests passed');
