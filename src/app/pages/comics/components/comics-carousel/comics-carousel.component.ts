import { Component, OnInit } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { SwiperOptions } from 'swiper';

import SwiperCore, {A11y,
  Autoplay,
  Controller,
  Navigation,
  Pagination,
  Scrollbar,
  Thumbs,
  Virtual,
  Zoom } from 'swiper';
import { SwiperModule } from 'swiper/angular';

SwiperCore.use([
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Virtual,
  Zoom,
  Autoplay,
  Thumbs,
  Controller
]);

@Component({
    selector: 'app-comics-carousel',
    templateUrl: './comics-carousel.component.html',
    styleUrls: ['./comics-carousel.component.scss'],
    imports: [
        SwiperModule
    ]
})
export class ComicsCarouselComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  public config: SwiperOptions = {
    slidesPerView: 1,
    autoplay: true,
    pagination: { clickable: true},
    breakpoints: {
      961: {
        navigation: true,
      }
    }
  };
}
