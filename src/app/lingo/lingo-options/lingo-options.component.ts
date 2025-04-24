import { Component, inject } from '@angular/core';
import { SelectChangeEvent } from 'primeng/select';
import { Difficulty, DIFFICULTY_OPTIONS, MAX_GUESSES_OPTIONS, WORD_LENGTH_OPTIONS } from '../../models/options.model';
import { LingoStore } from '../store/lingo.store';

@Component({
  selector: 'app-lingo-options',
  standalone: false,
  templateUrl: './lingo-options.component.html',
  styleUrl: './lingo-options.component.css'
})
export class LingoOptionsComponent {
  
  readonly store = inject(LingoStore);

  difficulty = this.store.options.difficulty;
  maxGuesses = this.store.options.maxGuesses;
  wordLength = this.store.options.wordLength;

  readonly DIFFICULTY_OPTIONS = DIFFICULTY_OPTIONS;
  readonly MAX_GUESSES_OPTIONS = MAX_GUESSES_OPTIONS;
  readonly WORD_LENGTH_OPTIONS = WORD_LENGTH_OPTIONS;

  onDifficultyChange(event : SelectChangeEvent) {
    this.store.setDifficulty(event.value as Difficulty);
  }

  onMaxGuessesChange(event : SelectChangeEvent) {
    this.store.setMaxGuesses(event.value as number);
  }

  onWordLengthChange(event : SelectChangeEvent) {
    this.store.setWordLength(event.value as number);
  }
}
