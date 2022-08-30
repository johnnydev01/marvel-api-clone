import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { SwiperModule } from 'swiper/angular';
import { ComicsPage } from './comics.page';
import { comicsInitialState } from './../state/comics.reducer';
import { ComicsCarouselComponent } from '../components/comics-carousel/comics-carousel.component';
import * as fromComicsActions from '../state/comics.actions';

describe(ComicsPage.name, () => {
  let component: ComicsPage;
  let fixture: ComponentFixture<ComicsPage>;
  let store: MockStore<any>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComicsPage, ComicsCarouselComponent ],
      imports: [
        SwiperModule,
        MatProgressSpinnerModule
      ],
      providers: [
        provideMockStore({initialState: {comics: comicsInitialState}})
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComicsPage);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show loading indicator', () => {
    store.setState({
      comics: {
        ...comicsInitialState,
        loading: true,
      }
    });
    fixture.detectChanges();
    const loading = fixture.debugElement.query(By.css('#loading'));
    expect(loading).toBeTruthy();
  });

  it('should dispatch loadMore action', () => {
    spyOn(store, 'dispatch');

    component.loadMore();

    expect(store.dispatch).toHaveBeenCalledWith(fromComicsActions.loadMore());
  })
});
