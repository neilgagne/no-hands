import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LingoGuessComponent } from './lingo-guess.component';

describe('LingoComponent', () => {
  let component: LingoGuessComponent;
  let fixture: ComponentFixture<LingoGuessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LingoGuessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LingoGuessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
