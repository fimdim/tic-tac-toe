---
name: improve-accessibility
description: Add keyboard accessibility to the game board
---

Improve the accessibility of the tic-tac-toe game board in `tic-tac-toe/index.html` and `tic-tac-toe/game.js`.

## Requirements

1. The board grid should be navigable with **arrow keys** (up/down/left/right).
2. Each cell should have an `aria-label` like `"Row 1, Column 2, empty"` or `"Row 1, Column 2, X"`.
3. Add a live region (`aria-live="polite"`) to announce game status changes to screen readers.
4. Pressing `Enter` or `Space` on a focused cell should play that cell.
5. After a game ends, focus should move to the "New Game" button automatically.
- Reuse the existing `role="status"` element as the polite live region; do not add a duplicate status announcer.

## Constraints

- Do not use any ARIA roles that conflict with the existing `<button>` elements.
- Test that tab order is logical (left-to-right, top-to-bottom) and that native button activation still works.
