export type Mode = "normal" | "blackout" | "short";

// 'name' is a legacy type, identical to 'english'
type Language = "english" | "name" | "japanese";

export type Options = {
  language: Language;
  mode: Mode;
  seed: number;
};
