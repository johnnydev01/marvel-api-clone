import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CharactersPage } from './containers/characters.page';
import { charactersReducer } from './state/characters.reducer';
import { CharactersEffects } from './state/characters.effects';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [CharactersPage],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: CharactersPage
      }
    ]),
    StoreModule.forFeature('characters', charactersReducer),
    EffectsModule.forFeature([CharactersEffects]),
    HttpClientModule
  ]
})
export class CharactersModule { }
