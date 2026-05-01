import { dareQuestions } from '../frontend/src/data/dareQuestions.js';
import { gameModes } from '../frontend/src/data/gameModes.js';
import { truthQuestions } from '../frontend/src/data/truthQuestions.js';

const SAFE_BLOCKLIST = [
  'abuse',
  'nude',
  'adult',
  'sex',
  'vulgar',
  'gali',
];

function isSafePrompt(prompt) {
  const normalizedPrompt = prompt.toLowerCase();
  return !SAFE_BLOCKLIST.some((blockedWord) =>
    normalizedPrompt.includes(blockedWord),
  );
}

function buildSafePromptBank(promptMap) {
  return Object.fromEntries(
    Object.entries(promptMap).map(([mode, prompts]) => [
      mode,
      prompts.filter(isSafePrompt),
    ]),
  );
}

export const availableModes = gameModes.map((mode) => mode.id);
export const truthPrompts = buildSafePromptBank(truthQuestions);
export const darePrompts = buildSafePromptBank(dareQuestions);
