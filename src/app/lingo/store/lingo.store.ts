import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { from, pipe, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { LingoService } from '../service/lingo.service';
import { Difficulty, EASY } from '../../models/options.model';

export type LingoOptions = {
  difficulty: Difficulty;
  maxGuesses: number;
  wordLength: number;
}

export const initialOptions: LingoOptions = {
  difficulty: EASY,
  maxGuesses: 6,
  wordLength: 5,
}

export type LingoState = {
  targetWord: string;
  isLoading: boolean;
  guesses: string[];
  currentGuess: string;
  options: LingoOptions;
  currentGameOptions: LingoOptions;
  error: string;
}

export const initialState: LingoState = {
  targetWord: '',
  isLoading: false,
  guesses: [],
  currentGuess: '',
  options: initialOptions,
  currentGameOptions: initialOptions,
  error: '',
};

export const LingoStore = signalStore(
  withState(initialState),
  withMethods((store, lingoService = inject(LingoService)) => ({
    setCurrentGuess(currentGuess: string): void {
      patchState(store, () => ({ currentGuess: currentGuess.toLowerCase() }));
    },
    setDifficulty(difficulty: Difficulty): void {
      patchState(store, (state) => ({ options: { ...state.options, difficulty } }));
    },
    setMaxGuesses(maxGuesses: number): void {
      patchState(store, (state) => ({ options: { ...state.options, maxGuesses } }));
    },
    setWordLength(wordLength: number): void {
      patchState(store, (state) => ({ options: { ...state.options, wordLength } }));
    },
    generateTargetWord: rxMethod<void>(pipe(
      tap(() => patchState(store, { isLoading: true })),
      switchMap(() => {
        const { difficulty, wordLength } = store.options();
        return from(lingoService.generateTargetWord(difficulty, wordLength)).pipe(
          tapResponse({
            next: (targetWord) => patchState(store, (state) => ({ targetWord: targetWord.toLowerCase(), guesses: [], currentGameOptions: state.options })),
            error: () => patchState(store, { error: 'Error generating word.' }),
            finalize: () => patchState(store, { isLoading: false }),
          })
        );
      }),
    )),
    submitCurrentGuess: rxMethod<void>(pipe(
      tap(() => patchState(store, { isLoading: true })),
      switchMap(() => {
        const guesses = store.guesses();
        const currentGuess = store.currentGuess();
        if (guesses.includes(currentGuess)) {
          patchState(store, { error: 'You already guessed that word.' });
          return from([]);
        }
        console.log('didnt use word');
        return from(lingoService.validateWord(currentGuess)).pipe(
          tapResponse({
            next: (isValid) => {
              if (!isValid) {
                patchState(store, { error: 'That word is not in the word list.' });
              } else {
                patchState(store, (state) => ({
                  guesses: [...state.guesses, state.currentGuess],
                  currentGuess: '',
                }));
              }
            },
            error: () => patchState(store, { error: 'Error validating word.' }),
            finalize: () => patchState(store, { isLoading: false }),
          })
        );
      })
    )),
  }))
);