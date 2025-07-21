import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, computed, effect, inject, signal } from '@angular/core';



import { PageEvent } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInput } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DatePipe } from '@angular/common';
import { CharactersQuery, CharactersStore } from '../store/characters.store';
import {MatPaginatorModule} from '@angular/material/paginator';

@Component({
    selector: 'app-characters',
    templateUrl: './characters.page.html',
    styleUrls: ['./characters.page.scss'],
    imports: [
        MatPaginatorModule,
        MatFormFieldModule,
        MatInput,
        MatIconModule,
        MatAutocompleteModule,
        MatOption,
        DatePipe,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class CharactersPage  implements OnInit {

  readonly store = inject(CharactersStore);


  public isLoading = this.store.isLoading;

  // MatPaginator Inputs
  public length = signal<number>(2700);
  public pageSize = signal<number>(36);
  public pageSizeOptions = signal<number[]>([6, 12, 18, 24, 36]);

  // MatPaginator Output
  pageEvent = signal<PageEvent | null>(null);
  nameStartsWith = signal('');

  public options = this.store.charactersNames;
  public characters = this.store.characters;

  constructor() {}

  ngOnInit(): void {
    this.loadByQuery();
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
    this.nameStartsWith().length > 0 ? this.store.loadCharactersByFilter(this.nameStartsWith()) : this.loadByQuery();
  }
}



