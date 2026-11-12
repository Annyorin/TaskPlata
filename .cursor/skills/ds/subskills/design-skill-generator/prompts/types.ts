export type PromptVersion = {
  id: string;
  name: string;
  description: string;
  sectionPrompts: Record<string, string>;
  buildPrompt: (opts: string[], skillName: string, screenCount: number, hasFigmaData: boolean) => string;
};
