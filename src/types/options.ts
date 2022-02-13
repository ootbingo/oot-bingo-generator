export type Mode = "normal" | "blackout" | "short";

type Language = "name" | "japanese";

export type Options = {
  language: Language;
  mode: Mode;
  seed: number;
};
