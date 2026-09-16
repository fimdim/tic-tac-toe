# sample-app

A sample repository containing a **Tic Tac Toe** web game and GitHub Copilot customization files.

## Tic Tac Toe

A fully playable, two-player tic-tac-toe game built with vanilla HTML, CSS, and JavaScript.

Open `tic-tac-toe/index.html` in any modern browser to play.

### Run in GitHub Codespaces

From the repository root, start a local web server:

```bash
python3 -m http.server 8000
```

Open the **Ports** panel in VS Code, find port `8000`, and select **Open in Browser**. The game is available at:

```text
http://localhost:8000/tic-tac-toe/
```

Stop the server with `Ctrl+C`.

Features:
- Two-player turn-based gameplay (X vs O)
- Win detection for all 8 winning lines
- Draw detection
- Session scoreboard with win/draw tracking
- New Game and Clear Scores controls
- Accessible status updates and board cell labels
- Animated winning cells

## Project Structure

| Path | Purpose |
|---|---|
| `tic-tac-toe/index.html` | Main game markup and UI controls |
| `tic-tac-toe/style.css` | Game styling and animations |
| `tic-tac-toe/game.js` | Game state, winner detection, and scoreboard logic |
| `AGENTS.md` | Repository-level guidance for Copilot agents |

## Development Notes

- Run the game logic tests with `node tests/game.test.js`.
- The devcontainer runs syntax checks and the game tests after creation.
- The scoreboard is persisted in browser-local storage and survives refreshes. If browser storage is unavailable, the game continues with in-memory scores for the current page session.

## GitHub Copilot Configuration

| Path | Purpose |
|---|---|
| `AGENTS.md` | Repository-level guidance for Copilot agents |
| `.github/copilot-instructions.md` | Always-on repository custom instructions |
| `.github/agents/*.agent.md` | Custom agent definitions |
| `.github/prompts/*.prompt.md` | Reusable prompt templates |
| `.github/skills/<skill>/SKILL.md` | Copilot skill definitions |
| `.github/mcp.json` | MCP server configuration (`filesystem`, `github`) |
