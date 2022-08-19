import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  mobileQuery: MediaQueryList;

  fillerNav = ['videos', 'characters', 'comics', 'movies', 'tv shows', 'games', 'news', 'culture & lifestyle', 'books'];

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  get onscroll(): boolean {
    window.onscroll = function (e){
        return true;
    }
    return false;
  }

  mouseEnter(id: string) {
      const div = document.getElementById(id);
      if(div !== null) {
        div.onmouseenter = (event) => {
          console.log(event)
      }
    }
    document.getElementById(id)?.classList.add('active');
  }

  mouseLeave(id: string) {
    document.getElementById(id)?.classList.remove('active');
  }

}
