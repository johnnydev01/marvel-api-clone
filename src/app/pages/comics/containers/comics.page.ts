import { Component, inject, OnInit, signal } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { ProgressSpinnerMode} from '@angular/material/progress-spinner';


import { ComicsCarouselComponent } from '../components/comics-carousel/comics-carousel.component';
import { ComicsQuery, ComicsStore } from '../store/comics.store';


@Component({
    selector: 'app-comics',
    templateUrl: './comics.page.html',
    styleUrls: ['./comics.page.scss'],
    imports: [
        ComicsCarouselComponent,
    ]
})
export class ComicsPage implements OnInit {

  readonly store = inject(ComicsStore);

  public comics = this.store.comics

  public isLoading = this.store.isLoading;

  color: ThemePalette = 'warn';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  private page = signal(0);

  constructor() {}

  ngOnInit(): void {
    this.store.getWithQuery()
  }

  loadMore(): void {
   this.page.update((page) => page + 1);
   this.store.setQuery({offset: this.page().toString(), limit: '12'} )
   this.store.loadMore()
   console.log('Comics', this.store.comics())
  }
}
