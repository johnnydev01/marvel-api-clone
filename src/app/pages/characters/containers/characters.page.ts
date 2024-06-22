import { Component, OnInit, computed, inject, signal } from '@angular/core';

import { debounceTime, filter, distinctUntilChanged, switchMap, merge, Observable } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';


import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { Character } from 'src/app/shared/models/character.model';
import { CharactersEntityService } from '../services/characters-entity.service';
import { EntityDataService, EntityDefinitionService, QueryParams } from '@ngrx/data';
import { MatOption, ThemePalette } from '@angular/material/core';
import { MatProgressSpinner, ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import {  MatAutocompleteModule } from '@angular/material/autocomplete';
import { CharactersDataService } from '../services/characters-data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
  standalone: true,
  imports: [
    MatPaginator,
    MatFormField,
    MatInput,
    MatIcon,
    MatAutocompleteModule,
    MatProgressSpinner,
    MatOption,
    DatePipe,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [
    CharactersEntityService,

  ]
})
export class CharactersPage implements OnInit {

  private charactersService = inject(CharactersEntityService)
  private entityDataService = inject(EntityDataService);
  private charactersDataService =  inject(CharactersDataService)

  public color = signal<ThemePalette>('warn');
  public mode = signal<ProgressSpinnerMode>('indeterminate');
  public value = signal<number>(50);
  public shouldShowLoadingIndicator = toSignal(this.charactersService.loading$);


  allCharacters$ = this.charactersService.entities$;
  // MatPaginator Inputs
  public length = signal<number>(2700);
  public pageSize = signal<number>(36);
  public pageSizeOptions = signal<number[]>([6, 12, 18, 24, 36]);

  // MatPaginator Output
  pageEvent = signal<PageEvent | null>(null);

  searchControl = new UntypedFormControl('');

  public options = signal<string[]>([]);

  charactersFilter$ = this.searchControl.valueChanges
    .pipe(
      debounceTime(500),
      filter((typedValue) => typedValue.length >=3 || !typedValue.length),
      distinctUntilChanged(),
      switchMap((typedValue) => this.getCharactersByName(typedValue))
    )
  public characters = toSignal<Character[]>(merge(this.allCharacters$, this.charactersFilter$));

  constructor() {
    this.entityDataService.registerService('Character', this.charactersDataService);
  }

  ngOnInit(): void {
    this.charactersService.clearCache();
    const params: QueryParams = {orderBy: 'name', offset: '0', limit: '36'}
    this.charactersService.getWithQuery(params);
  }

  getCharactersByPage(eventPage: PageEvent): void {
    this.pageEvent.set(eventPage);
    const offset = computed<string>(() => (this.pageEvent().pageIndex * 36).toString());
    const params: QueryParams = {
      offset: offset(),
      limit: (this.pageEvent().pageSize).toString()
    };
    this.charactersService.clearCache();
    this.charactersService.getWithQuery(params)
    this.allCharacters$ = this.charactersService.entities$;
  }

  getCharactersByName(nameStartsWith: string): Observable<Character[]> {
    this.charactersService.clearCache();

    if(nameStartsWith.length == 0){
      const offset = computed<string>(() => (this.pageEvent()?.pageIndex ? this.pageEvent().pageIndex : 0).toString());
      const limit = computed<string>( () => (this.pageEvent()?.pageSize ? this.pageEvent().pageSize : 36).toString())
      const params: QueryParams = {'offset': offset(), limit: limit()}

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
        this.options.set(charactersNames);
      }
    });
    if(nameStartsWith.length == 0){
      this.options.set([]);
    }
    return characters$;
  }
}

