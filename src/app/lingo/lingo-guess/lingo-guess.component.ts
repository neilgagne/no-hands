import { Component, inject, Input } from '@angular/core';

@Component({
  selector: 'app-lingo-guess',
  standalone: false,
  templateUrl: './lingo-guess.component.html',
  styleUrl: './lingo-guess.component.css'
})
export class LingoGuessComponent {
  @Input() guess: string[] = [];
  @Input() isCurrent = false;
  @Input() target: string[] = [];

  get tiles(): { letter: string, state: 'empty' | 'correct' | 'present' | 'absent' | 'uncolored' }[] {
    const tiles: { letter: string, state: 'empty' | 'correct' | 'present' | 'absent' | 'uncolored' }[] = [];
    const guessArr = this.guess;
    const targetArr = this.target;
    const used = Array(targetArr.length).fill(false);
  
    // Mark correct positions first
    for (let i = 0; i < targetArr.length; i++) {
      if (guessArr[i] === targetArr[i]) {
        tiles[i] = { letter: guessArr[i], state: this.isCurrent ? 'uncolored' : 'correct' };
        used[i] = true;
      } else {
        tiles[i] = { letter: guessArr[i] || '', state: 'empty' };
      }
    }
  
    // Mark present (yellow) and absent (grey)
    for (let i = 0; i < targetArr.length; i++) {
      if (tiles[i].state === 'empty') {
        const letter = guessArr[i];
        if (!letter) {
          tiles[i] = { letter: '', state: 'empty' };
        } else if (this.isCurrent) {
          tiles[i] = { letter, state: 'uncolored' };
        } else {
          // Check if letter is present elsewhere in target (not already used)
          let found = false;
          for (let j = 0; j < targetArr.length; j++) {
            if (!used[j] && targetArr[j] === letter) {
              found = true;
              used[j] = true;
              break;
            }
          }
          tiles[i] = found
            ? { letter, state: 'present' as const }
            : { letter, state: 'absent' as const };
        }
      }
    }
    return tiles;
  }
}
