import { Component, computed, inject, OnInit, signal } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { MatProgressSpinner, ProgressSpinnerMode} from '@angular/material/progress-spinner';


import { ComicsEntityService } from '../services/comics-entity.service';
import { ComicsCarouselComponent } from '../components/comics-carousel/comics-carousel.component';
import { EntityDataService } from '@ngrx/data';
import { ComicsDataService } from '../services/comics-data.service';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ComicsItemComponent } from '../components/comics-item/comics-item.component';


@Component({
  selector: 'app-comics',
  templateUrl: './comics.page.html',
  styleUrls: ['./comics.page.scss'],
  standalone: true,
  imports: [
    MatProgressSpinner,
    ComicsCarouselComponent,
    AsyncPipe,
    ComicsItemComponent
  ],
  providers: [
    ComicsEntityService,
  ]
})
export class ComicsPage implements OnInit {
  private entityDataService = inject(EntityDataService);
  private comicsDataService =  inject(ComicsDataService)
  private comicsService = inject(ComicsEntityService);


  public shouldShowLoadingIndicator = toSignal(this.comicsService.loading$);

  color: ThemePalette = 'warn';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  private page = signal(0);

  constructor() {
    this.entityDataService.registerService('Comic', this.comicsDataService);

   }

  ngOnInit(): void {
    this.comicsService.getWithQuery({'offset':  '0'});
  }

  loadMore(): void {
   this.page.update((page) => page + 1);
   this.comicsService.getWithQuery({'offset': this.page().toString()})
  }
}
