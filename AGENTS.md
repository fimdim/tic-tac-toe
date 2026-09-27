# AGENTS.md

Repository guidance for GitHub Copilot agents.

## Project

- Vanilla HTML/CSS/JavaScript Tic Tac Toe app.
- Main app files:
  - `tic-tac-toe/index.html`
  - `tic-tac-toe/style.css`
  - `tic-tac-toe/game.js`

## Commands

- Run locally: open `tic-tac-toe/index.html` in a browser.
- Run game logic tests: `node tests/game.test.js`.
- Check JavaScript syntax: `node --check tic-tac-toe/game.js`.

## Coding rules

- Use ES6+ JavaScript with `const`/`let`.
- 2-space indentation.
- Single quotes in JavaScript.
- Kebab-case for CSS classes and HTML IDs.
- camelCase for JavaScript identifiers.
- Preserve the existing dark palette: `#1a1a2e`, `#16213e`, `#0f3460`, `#e94560`, `#a8dadc`.

## Game logic contract

- `board` stores `'X'`, `'O'`, or `null` for 9 cells.
- `WINNING_LINES` contains all 8 winning combinations.
- `checkWinner(board)` should return:
  - `{ winner, line }` on win
  - `{ draw: true }` on draw
  - `null` while in progress
- The shipped game is two-player only; AI and undo are not implemented. Scores persist in browser-local storage when available.

## Safety boundaries

- Do not introduce external dependencies unless explicitly requested.
- Do not commit secrets.
- Keep changes minimal and task-focused.

## Agent workflow

For complete feature work, use the orchestrated workflow defined in `.github/agents/orchestrator.agent.md`:

1. `feature-planner` defines the scope, acceptance criteria, edge cases, and rollout steps.
2. `implementer` applies the approved plan and runs focused checks.
3. `test-writer` adds or updates focused game logic tests.
4. `doc-maintainer` updates documentation when the change affects behavior, commands, configuration, or agent guidance.
5. `code-reviewer` independently reviews the implementation.
6. `release-validator` runs final checks and reports readiness.

The orchestrator coordinates these stages and passes their outputs between them. Skip `doc-maintainer` only when no documentation-relevant behavior or workflow changed. Do not report work as complete until the relevant tests and release validation pass. Keep implementation, documentation, and review responsibilities separate.
