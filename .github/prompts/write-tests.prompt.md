---
name: write-tic-tac-toe-tests
description: Write unit tests for game.js logic
---

Generate or update `tests/game.test.js` for the tic-tac-toe game logic.

## What to test

1. **`checkWinner(board)`** — all 8 winning lines for both X and O.
2. **Draw detection** — board full with no winner.
3. **In-progress game** — returns `null` when game is not over.
4. **Board immutability** — the function should not mutate its input.

## Constraints

- Use Node.js `assert` module only (no Jest, Mocha, etc.).
- The test file must be runnable with `node tests/game.test.js`.
- `checkWinner(board)` accepts a 9-element board array and is already exported from `game.js`:
  ```js
  if (typeof module !== 'undefined') module.exports = { checkWinner };
  ```
- Print `All tests passed ✓` at the end of the test file.
