import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./comics-carousel.component.scss']
})
export class ComicsCarouselComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  config: SwiperOptions = {
    slidesPerView: 1,
    autoplay: true,
    pagination: { clickable: true},
    breakpoints: {
      961: {
        navigation: true,
      }
    }
  };
  onSwiper(swiper) {
  }
  onSlideChange() {
  }
}
