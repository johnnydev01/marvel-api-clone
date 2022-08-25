import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { debounceTime, filter, distinctUntilChanged, switchMap, merge, tap, Observable } from 'rxjs';

import * as fromCharactersActions from '../state/characters.actions';
import * as fromCharactersSelectors from '../state/characters.selectors';

import { PageEvent } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { Character } from 'src/app/shared/models/character.model';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss']
})
export class CharactersPage implements OnInit {

  allCharacters$ = this.store.pipe(select(fromCharactersSelectors.selectCharactersList))
  // MatPaginator Inputs
  length = 2700;
  pageSize = 36;
  pageSizeOptions: number[] = [6, 12, 18, 24, 36];

  // MatPaginator Output
  pageEvent: PageEvent;

  searchControl = new FormControl('');
  options: string[] = [];

  charactersFilter$ = this.searchControl.valueChanges
    .pipe(
      debounceTime(300),
      filter((typedValue) => typedValue.length >=3 || !typedValue.length),
      distinctUntilChanged(),
      switchMap((typedValue) => this.getCharactersByName(typedValue))
    )
  characters$ = merge(this.allCharacters$, this.charactersFilter$);

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(fromCharactersActions.loadCharacterByParams({offset: 0, limit:36}));
  }

  getCharactersByPage(eventPage: PageEvent): void {
    this.pageEvent = eventPage;
    this.store.dispatch(fromCharactersActions.loadCharacterByParams({offset: this.pageEvent.pageIndex, limit:this.pageEvent.pageSize}));
    this.allCharacters$ = this.store.pipe(select(fromCharactersSelectors.selectCharactersList));
  }

  getCharactersByName(nameStartsWith: string): Observable<Character[]> {
    console.log("name", nameStartsWith)
    if(nameStartsWith.length == 0){
      const offset = this.pageEvent?.pageIndex ? this.pageEvent.pageIndex : 0;
      const limit = this.pageEvent?.pageSize? this.pageEvent.pageSize : 36;
      this.store.dispatch(fromCharactersActions.loadCharacterByParams({offset: offset, limit: limit, nameStartsWith: nameStartsWith}));

    }else {
      this.store.dispatch(fromCharactersActions.loadCharacterByParams({nameStartsWith: nameStartsWith}));
    }
    const characters$ = this.store.pipe(select(fromCharactersSelectors.selectCharactersList));
    characters$.subscribe((characters) => {
      if(characters.length < 36) {
        const charactersNames: string[] =[];
        characters.forEach((character) => {
          charactersNames.push(character.name);
        });
        this.options = charactersNames;
      }
    });
    if(nameStartsWith.length == 0){
      this.options = [];
    }
    return characters$;
  }

}
