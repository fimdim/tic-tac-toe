# GitHub Copilot Instructions

## Project Context

This is a **Tic Tac Toe** web application using vanilla HTML, CSS, and JavaScript. No build tools or frameworks are used.

## Code Style

- Use ES6+ JavaScript (`const`, `let`, arrow functions, template literals, destructuring).
- 2-space indentation throughout.
- Single quotes for strings in JavaScript.
- Kebab-case for CSS class names and HTML IDs.
- camelCase for JavaScript variables and functions.

## Responses

- Keep code changes minimal and focused on the request.
- Explain *why* a change is made if it's non-obvious.
- Prefer built-in browser APIs over external libraries.
- When suggesting CSS changes, respect the existing dark-theme color palette (`#1a1a2e`, `#16213e`, `#0f3460`, `#e94560`, `#a8dadc`).

## Game Logic Rules

- The `board` array stores `'X'`, `'O'`, or `null` for each of the 9 cells.
- `WINNING_LINES` defines all 8 possible winning combinations.
- `checkWinner(board)` returns `{ winner, line }` on win, `{ draw: true }` on draw, or `null` for in-progress.
- The shipped game is two-player only; do not assume AI or undo exist. Scores persist in browser-local storage when available.
- Run `node tests/game.test.js` after game-logic changes.
