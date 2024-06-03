import { Component, OnInit } from '@angular/core';

import { debounceTime, filter, distinctUntilChanged, switchMap, merge, Observable } from 'rxjs';


import { LegacyPageEvent as PageEvent } from '@angular/material/legacy-paginator';
import { UntypedFormControl } from '@angular/forms';
import { Character } from 'src/app/shared/models/character.model';
import { CharactersEntityService } from '../services/characters-entity.service';
import { QueryParams } from '@ngrx/data';
import { ThemePalette } from '@angular/material/core';
import { LegacyProgressSpinnerMode as ProgressSpinnerMode } from '@angular/material/legacy-progress-spinner';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss']
})
export class CharactersPage implements OnInit {

  color: ThemePalette = 'warn';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;
  shouldShowLoadingIndicator$ = this.charactersService.loading$;


  allCharacters$ = this.charactersService.entities$;;
  // MatPaginator Inputs
  length = 2700;
  pageSize = 36;
  pageSizeOptions: number[] = [6, 12, 18, 24, 36];

  // MatPaginator Output
  pageEvent: PageEvent;

  searchControl = new UntypedFormControl('');
  options: string[] = [];

  charactersFilter$ = this.searchControl.valueChanges
    .pipe(
      debounceTime(500),
      filter((typedValue) => typedValue.length >=3 || !typedValue.length),
      distinctUntilChanged(),
      switchMap((typedValue) => this.getCharactersByName(typedValue))
    )
  characters$ = merge(this.allCharacters$, this.charactersFilter$);

  constructor(
    private charactersService: CharactersEntityService
  ) { }

  ngOnInit(): void {}

  getCharactersByPage(eventPage: PageEvent): void {
    this.pageEvent = eventPage;
    const params: QueryParams = {
      offset: (this.pageEvent.pageIndex * 36).toString(),
      limit: (this.pageEvent.pageSize).toString()
    };
    this.charactersService.clearCache();
    this.charactersService.getWithQuery(params)
    this.allCharacters$ = this.charactersService.entities$;
  }

  getCharactersByName(nameStartsWith: string): Observable<Character[]> {
    this.charactersService.clearCache();

    if(nameStartsWith.length == 0){
      const offset = (this.pageEvent?.pageIndex ? this.pageEvent.pageIndex : 0).toString();
      const limit = (this.pageEvent?.pageSize? this.pageEvent.pageSize : 36).toString();
      const params: QueryParams = {offset, limit}

      this.charactersService.getWithQuery(params)
    } else {
      const params: QueryParams = {nameStartsWith, offset: '0', limit: '36'};
      this.charactersService.getWithQuery(params)

    }
    const characters$ = this.charactersService.entities$;
    characters$.subscribe((characters) => {
      if(characters.length < 36) {
        const charactersNames: string[] = [];
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
