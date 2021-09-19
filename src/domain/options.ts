export type Mode = 'normal' | 'blackout' | 'short';

type Language = 'name' | 'japanse';

export type Options = {
    language: Language;
    mode: Mode;
    seed: number;
}