import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MockStore, provideMockStore } from '@ngrx/store/testing';

import * as fromCharactersActions from '../state/characters.actions';
import { charactersInitialSate } from '../state/characters.reducer';
import { CharactersPage } from './characters.page';

describe(CharactersPage.name, () => {
  let component: CharactersPage;
  let fixture: ComponentFixture<CharactersPage>;
  let store: MockStore<any>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharactersPage ],
      imports: [
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatAutocompleteModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        provideMockStore({initialState: {characters: charactersInitialSate}})
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactersPage);
    component = fixture.componentInstance;

    store = TestBed.inject(MockStore);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should search characters with name hulk', fakeAsync(() => {
    const app = fixture.debugElement.componentInstance;
    const search: HTMLInputElement  = fixture.debugElement.query(By.css('#searchCharacters')).nativeElement;
    search.value = 'hulk';
    search.dispatchEvent(new Event('input'));
    search.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    tick(300);
    expect(app.searchControl.value).toBe('hulk');
  }));

  it("should serach characters with name ' '", () => {
    spyOn(store, 'dispatch');
    fixture.detectChanges();
    component.getCharactersByName('');
    expect(store.dispatch).toHaveBeenCalledWith(fromCharactersActions.loadCharacterByParams({offset: 0, limit:36, nameStartsWith: ''}));
  });

  it('should dispatch loadCharacterByParams action', () => {
    spyOn(store, 'dispatch');
    const eventPage = new PageEvent();
    eventPage.pageIndex = 0;
    eventPage.pageSize = 36;
    component.getCharactersByPage(eventPage);

    expect(store.dispatch).toHaveBeenCalledWith(fromCharactersActions.loadCharacterByParams({offset: 0, limit:36}));
  });


});
