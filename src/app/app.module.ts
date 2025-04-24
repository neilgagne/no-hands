import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { PopoverModule } from 'primeng/popover';
import { ToastModule } from 'primeng/toast';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { LingoComponent } from './lingo/lingo.component';
import { FormsModule } from '@angular/forms';
import { LingoOptionsComponent } from './lingo/lingo-options/lingo-options.component';
import { LingoKeyboardComponent } from './lingo/lingo-keyboard/lingo-keyboard.component';
import { LingoGuessComponent } from './lingo/lingo-guess/lingo-guess.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    HomeComponent,
    LingoComponent,
    LingoOptionsComponent,
    LingoKeyboardComponent,
    LingoGuessComponent,
  ],
  imports: [
    AppRoutingModule,
    // Angular modules
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    // PrimeNG modules
    ButtonModule,
    MenubarModule,
    InputTextModule,
    SelectModule,
    PopoverModule,
    ToastModule,
    ProgressSpinnerModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    providePrimeNG({
        theme: {
            preset: Aura
        }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
