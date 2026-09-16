const fs = require('node:fs');
const path = require('node:path');

const event = process.argv[2];
const logFile = event === 'UserPromptSubmit' ? 'prompts.log' : 'session.log';
const logDirectory = path.join(process.cwd(), 'logs', 'copilot');

if (process.env.SKIP_LOGGING === 'true') process.exit(0);
if (!event) process.exit(1);

fs.mkdirSync(logDirectory, { recursive: true });
const entry = {
  timestamp: new Date().toISOString(),
  event,
  ...(event === 'UserPromptSubmit' ? { level: process.env.LOG_LEVEL || 'INFO' } : {})
};

fs.appendFileSync(path.join(logDirectory, logFile), `${JSON.stringify(entry)}\n`);