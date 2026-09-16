---
name: explain-game-state
description: Explain a tic-tac-toe board state from a 9-cell array.
---

Input:
- `board`: JSON array with 9 values (`'X'`, `'O'`, or `null`).

Validation:
- Reject inputs that are not arrays of exactly 9 values from the allowed set.
- Reject impossible positions: X and O counts must differ by at most one, and a winning position must not contain moves after the winner's turn.

Behavior:
1. Render a 3x3 board view.
2. Return game status: X wins, O wins, draw, or in progress.
3. If in progress, infer next turn from symbol counts.
4. List immediate winning opportunities for each player.

Use the same eight winning lines and win-before-draw precedence as `checkWinner` in `tic-tac-toe/game.js`.
