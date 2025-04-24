import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KEYS } from '../../models/keyboard';

@Component({
  selector: 'app-lingo-keyboard',
  standalone: false,
  templateUrl: './lingo-keyboard.component.html',
  styleUrl: './lingo-keyboard.component.css'
})
export class LingoKeyboardComponent {
  @Input() correctlyGuessedLetters: string[] = [];
  @Input() wrongPlaceLetters: string[] = [];
  @Input() incorrectLetters: string[] = [];
  
  @Output() onKeyPress = new EventEmitter<string>();
  @Output() onBackspace = new EventEmitter();
  @Output() onEnter = new EventEmitter();

  readonly KEYS = KEYS;

  handleKeyPress(key: string) {
    this.onKeyPress.emit(key);
  }

  handleBackspace() {
    this.onBackspace.emit();
  }

  handleEnter() {
    this.onEnter.emit();
  }

}
