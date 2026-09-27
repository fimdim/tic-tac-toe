---
title: Sample Tic Tac Toe App
description: A vanilla JavaScript Tic Tac Toe game with GitHub Copilot customizations
---

A sample repository containing a **Tic Tac Toe** web game and GitHub Copilot customization files.

## Tic Tac Toe

A fully playable, two-player tic-tac-toe game built with vanilla HTML, CSS, and JavaScript.

Open `tic-tac-toe/index.html` in any modern browser to play.

### Run in GitHub Codespaces

From the repository root, start a local web server:

```bash
py -m http.server 8000
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
| `.github/agents/*.agent.md` | Custom agent definitions and workflow specialists |
| `.github/prompts/*.prompt.md` | Reusable prompt templates |
| `.github/skills/<skill>/SKILL.md` | Copilot skill definitions |
| `.vscode/mcp.json` | MCP server configuration (`filesystem`, `github`) |

## GitHub Agentic Workflows

### Repository Status Workflow

The `Repo Status` GitHub Actions workflow runs daily and can also be started manually from the Actions tab. It reviews recent repository activity and creates a concise status report as a GitHub issue with the `report` and `daily-status` labels.

The editable workflow definition is `.github/workflows/repo-status.md`. Its generated lock file, `.github/workflows/repo-status.lock.yml`, is maintained by GitHub Agentic Workflows and should not be edited directly.

### Documentation Update Workflow

The `Documentation Updater` GitHub Actions workflow runs daily and can also be started manually from the Actions tab. It reviews merged pull requests and significant commits from the previous 24 hours, then opens a non-draft documentation pull request when it finds an update to make. Created pull requests use the `[docs]` prefix and the `documentation` and `automation` labels.

The editable workflow definition is `.github/workflows/doc-updater.md`. Its generated lock file, `.github/workflows/doc-updater.lock.yml`, is maintained by GitHub Agentic Workflows and should not be edited directly. This workflow is separate from the `doc-maintainer` custom agent, which updates documentation as part of the repository's orchestrated Copilot workflow.

## Custom Agent Workflow

The `orchestrator` agent coordinates the repository's specialist agents in this order:

1. `feature-planner` creates an implementation-ready plan and acceptance criteria.
2. `implementer` makes the approved code changes and runs focused checks.
3. `test-writer` adds or updates dependency-free game logic tests.
4. `doc-maintainer` updates documentation when behavior, commands, configuration, or agent guidance changes.
5. `code-reviewer` independently reviews correctness, accessibility, security, and style.
6. `release-validator` runs final executable checks and gives a `Ready` or `Not ready` verdict.

The orchestrator owns coordination and handoffs; it does not normally implement features itself. Documentation updates are conditional, and work is not reported complete until focused tests and release validation pass.

| Agent | Responsibility |
|---|---|
| `feature-planner` | Read-only planning and risk identification |
| `implementer` | Scoped implementation and local validation |
| `test-writer` | Node.js `assert`-based game logic tests |
| `doc-maintainer` | Documentation accuracy for behavior, setup, and workflow changes |
| `code-reviewer` | Independent correctness, accessibility, and security review |
| `release-validator` | Final checks and readiness decision |
| `orchestrator` | Workflow coordination, failure handling, and final summary |

## License

This project is licensed under the [MIT License](LICENSE).
