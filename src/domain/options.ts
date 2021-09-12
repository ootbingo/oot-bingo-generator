type Mode = 'normal' | 'blackout' | 'short';
type GoalListMode = 'normal' | 'short';

type Language = 'name' | 'japanse';

interface Options {
    language: Language;
    mode: Mode;
    seed: number;
}