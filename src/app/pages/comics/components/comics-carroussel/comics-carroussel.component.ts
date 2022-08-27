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
  selector: 'app-comics-carroussel',
  templateUrl: './comics-carroussel.component.html',
  styleUrls: ['./comics-carroussel.component.scss']
})
export class ComicsCarrousselComponent implements OnInit {

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
    console.log(swiper);
  }
  onSlideChange() {
    console.log('slide change');
  }
}
