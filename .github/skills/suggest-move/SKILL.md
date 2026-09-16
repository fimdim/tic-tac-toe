---
name: suggest-move
description: Suggest the best move for a tic-tac-toe position.
---

Input:
- `board`: JSON array with 9 values (`'X'`, `'O'`, or `null`).
- `player`: `'X'` or `'O'`.

Validation:
- Reject boards that are not 9-element arrays containing only `'X'`, `'O'`, or `null`.
- Reject impossible turn counts; X starts, so the requested player must be the next player.
- If the position is already won or drawn, report that before suggesting a move.

Behavior:
1. Suggest the strongest legal move (0-8).
2. Explain why the move is best.
3. Show the board after applying the move.
4. If game is finished, report that and return no move.

Choose an optimal move with minimax: prefer a forced win, then a draw, and delay a forced loss as long as possible. Break equivalent choices by the lowest cell index for deterministic results.
