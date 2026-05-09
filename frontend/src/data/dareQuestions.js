import { darePromptCatalog } from './promptCatalog';

export const dareQuestions = Object.fromEntries(
  Object.entries(darePromptCatalog).map(([mode, prompts]) => [
    mode,
    prompts.map(({ hi }) => hi),
  ]),
);
