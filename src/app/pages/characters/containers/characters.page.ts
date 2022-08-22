import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromCharactersActions from '../state/characters.actions';
import * as fromCharactersSelectors from '../state/characters.selectors';

import { Character } from 'src/app/shared/models/character.model';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss']
})
export class CharactersPage implements OnInit {

  characters$: Observable<Character[]>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(fromCharactersActions.loadCharacter());


    this.store.pipe(select(fromCharactersSelectors.selectCharactersList));
  }

}
