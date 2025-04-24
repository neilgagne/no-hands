export const EASY = 'Easy';
export const MEDIUM = 'Medium';
export const HARD = 'Hard';

export type Difficulty = typeof EASY | typeof MEDIUM | typeof HARD;

export const DIFFICULTIES: Difficulty[] = [ EASY, MEDIUM, HARD ];

export const DIFFICULTY_OPTIONS = DIFFICULTIES.map((difficulty) => ({ 
    label: difficulty, 
    value: difficulty 
}));

export const MAX_GUESSES = [1, 2, 3, 4, 5, 6];

export const MAX_GUESSES_OPTIONS = MAX_GUESSES.map((maxGuesses) => ({ 
    label: maxGuesses, 
    value: maxGuesses 
}));

export const WORD_LENGTH = [2, 3, 4, 5, 6, 7, 8, 9];

export const WORD_LENGTH_OPTIONS = WORD_LENGTH.map((wordLength) => ({ 
    label: wordLength, 
    value: wordLength 
}));