---
name: add-ai-opponent
description: Add an AI opponent using the minimax algorithm
---

Add a single-player mode to the tic-tac-toe game with an unbeatable AI opponent.

## Requirements

- Implement the **minimax algorithm** in `tic-tac-toe/game.js`.
- Add a mode selector in `tic-tac-toe/index.html` — "2 Players" vs "vs Computer".
- The computer always plays as `O`.
- After the human plays, the computer should automatically take its turn after a short delay (300 ms).
- The AI must be unbeatable (minimax with no depth limit).
- Disable board input while the computer turn is pending.
- Cancel pending computer moves when starting a new game or changing modes.

## Constraints

- Vanilla JavaScript only — no libraries.
- Do not break the existing 2-player mode.
- Keep the existing scoring system working for both modes.
- Add focused tests for minimax choices, delayed-turn input lockout, reset cancellation, and preserving two-player behavior.
