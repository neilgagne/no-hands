import { Component, computed, effect, HostListener, inject } from '@angular/core';
import { LingoStore } from './store/lingo.store';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-lingo',
  standalone: false,
  templateUrl: './lingo.component.html',
  styleUrl: './lingo.component.css',
  providers: [LingoStore, MessageService],
})
export class LingoComponent {
  
  readonly store = inject(LingoStore);

  targetWord = this.store.targetWord;
  isLoading = this.store.isLoading;
  guesses = this.store.guesses;
  currentGuess = this.store.currentGuess;

  difficulty = this.store.options.difficulty;
  maxGuesses = this.store.options.maxGuesses;
  wordLength = this.store.options.wordLength;

  error = this.store.error;
  
  currentGameDifficulty = this.store.currentGameOptions.difficulty;
  currentGameMaxGuesses = this.store.currentGameOptions.maxGuesses;
  currentGameWordLength = this.store.currentGameOptions.wordLength;

  splitTargetWord = computed(() => {
    return this.targetWord().split('');
  });

  splitGuesses = computed(() => {
    return this.guesses().map(guess => guess.split(''));
  });

  splitCurrentGuess = computed(() => {
    return this.currentGuess().split('');
  });

  correctlyGuessedLetters = computed(() => {
    const splitTarget = this.splitTargetWord();
    const splitGuesses = this.splitGuesses();
    const correctSet = new Set<string>();
  
    splitGuesses.forEach(guessArr => {
      guessArr.forEach((char, idx) => {
        if (splitTarget[idx] === char) {
          correctSet.add(char);
        }
      });
    });
  
    return Array.from(correctSet);
  });

  wrongPlaceLetters = computed(() => {
    const splitTarget = this.splitTargetWord();
    const splitGuesses = this.splitGuesses();
    const correctSet = new Set<string>();
    const wrongPlaceSet = new Set<string>();
  
    splitGuesses.forEach(guessArr => {
      guessArr.forEach((char, idx) => {
        if (splitTarget[idx] === char) {
          correctSet.add(char);
        } else if (splitTarget.includes(char)) {
          wrongPlaceSet.add(char);
        }
      });
    });
  
    // Remove any letters that are in the correct place from the wrong place set
    correctSet.forEach(char => wrongPlaceSet.delete(char));
  
    return Array.from(wrongPlaceSet);
  });

  incorrectLetters = computed(() => {
    const splitTarget = this.splitTargetWord();
    const splitGuesses = this.splitGuesses();
    const incorrectSet = new Set<string>();
  
    splitGuesses.forEach(guessArr => {
      guessArr.forEach(char => {
        if (!splitTarget.includes(char)) {
          incorrectSet.add(char);
        }
      });
    });
  
    return Array.from(incorrectSet);
  });

  currentGuessIsMaxLength = computed(() => {
    return this.currentGuess().length >= this.targetWord().length;
  });

  isGameWon = computed(() => {
    return this.guesses().includes(this.targetWord());
  });

  isGameOver = computed(() => {
    return this.guesses().includes(this.targetWord() ) || 
      this.guesses().length >= this.maxGuesses();
  });
  
  constructor(private messageService: MessageService) {
    effect(() => {
      const errorMessage = this.error();
      if (errorMessage) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
      }
    });
  }

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (/^[a-zA-Z]$/.test(event.key)) {
      this.captureInput(event.key);
    } else if (event.key === 'Backspace') {
      this.backspace();
    } else if (event.key === 'Enter') {
      this.submitGuess();
    }
  }

  captureInput(key: string) {
    if (this.targetWord() && !this.isGameOver() && !this.currentGuessIsMaxLength()) {
      this.store.setCurrentGuess(this.currentGuess() + key);
    }
  }

  backspace() {
    if (this.targetWord() && !this.isGameOver()) {
      this.store.setCurrentGuess(this.currentGuess().substring(0, this.currentGuess().length - 1));
    }
  }

  setCurrentGuess(event: Event) {
    const currentGuess = (<HTMLTextAreaElement>event.target).value;
    this.store.setCurrentGuess(currentGuess);
  }

  submitGuess() {
    if (this.currentGuessIsMaxLength()) {
      this.store.submitCurrentGuess();
    }
  }

  generateTargetWord() {
    this.store.generateTargetWord();
  }
}
