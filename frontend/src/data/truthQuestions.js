import { truthPromptCatalog } from './promptCatalog';

export const truthQuestions = Object.fromEntries(
  Object.entries(truthPromptCatalog).map(([mode, prompts]) => [
    mode,
    prompts.map(({ hi }) => hi),
  ]),
);
