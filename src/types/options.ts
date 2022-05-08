export type Mode = "normal" | "blackout" | "short" | "shortBlackout";

// 'name' is a legacy type, identical to 'english'
type Language = "english" | "name" | "japanese";

export type Options = {
  language: Language;
  mode: Mode;
  seed: number;
};
