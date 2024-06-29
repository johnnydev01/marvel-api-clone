import { ChangeDetectionStrategy, Component, OnInit, computed, effect, inject, signal } from '@angular/core';



import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOption, ThemePalette } from '@angular/material/core';
import { MatProgressSpinner, ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import {  MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';
import { CharactersQuery, CharactersStore } from '../store/characters.store';
import { Character } from 'src/app/shared/models/character.model';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.page.html',
  styleUrls: ['./characters.page.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
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
    JsonPipe,
    AsyncPipe,

  ],
  providers: [
    CharactersStore
  ]
})
export class CharactersPage  {

  readonly store = inject(CharactersStore);

  public color = signal<ThemePalette>('warn');
  public mode = signal<ProgressSpinnerMode>('indeterminate');
  public value = signal<number>(50);
  public shouldShowLoadingIndicator = this.store.isLoading;


  // MatPaginator Inputs
  public length = signal<number>(2700);
  public pageSize = signal<number>(36);
  public pageSizeOptions = signal<number[]>([6, 12, 18, 24, 36]);

  // MatPaginator Output
  pageEvent = signal<PageEvent | null>(null);
  nameStartsWith = signal('');


  public options = this.store.charactersNames;
  public characters = this.store.characters;

  constructor() {
    effect(() => {
      this.nameStartsWith().length > 0 ? this.store.loadCharactersByFilter(this.nameStartsWith()) : this.loadByQuery()
    }, {allowSignalWrites: true});
  }

  async loadByQuery() {
    await this.store.loadByQuery();
  }


  getCharactersByPage(eventPage: PageEvent): void {
    this.pageEvent.set(eventPage);
    const offset = computed<string>(() => (this.pageEvent().pageIndex * 36).toString());
    const query = {
      offset: offset(),
      limit: (this.pageEvent().pageSize).toString()
    };
    this.store.setQuery(query);
    this.loadByQuery();
  }

  setQuery(): void {
    if(this.nameStartsWith().length === 0){
      const offset = computed<string>(() => (this.pageEvent()?.pageIndex ? this.pageEvent().pageIndex : 0).toString());
      const limit = computed<string>( () => (this.pageEvent()?.pageSize ? this.pageEvent().pageSize : 36).toString())
      const query: CharactersQuery = {'offset': offset(), limit: limit()};
      this.store.setQuery(query);
    }
  }

  onSearchUpdated(nameStartsWith: string) {
    this.nameStartsWith.set(nameStartsWith);
    this.setQuery();
  }
}



