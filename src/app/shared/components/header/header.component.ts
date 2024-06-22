import { ChangeDetectorRef, Component, signal } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatIcon } from '@angular/material/icon';
import { MatToolbar, MatToolbarRow } from '@angular/material/toolbar';
import { MatList, MatNavList } from '@angular/material/list';
import { MatButton } from '@angular/material/button';
import { PreloadAllModules, RouterLink, RouterOutlet, provideRouter, withDebugTracing, withPreloading } from '@angular/router';
import { APP_ROUTES } from 'src/app/app.routes';


interface FillerNav {
  name: string;
  link: string;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    MatSidenav,
    MatNavList,
    MatSidenavContainer,
    MatIcon,
    MatToolbar,
    MatToolbarRow,
    MatList,
    MatButton,
    MatSidenavContent,
    RouterLink,
    RouterOutlet
  ],
})
export class HeaderComponent {

  mobileQuery: MediaQueryList;

  public fillerNav = signal<FillerNav[]>([
    {name: 'videos', link:"videos"},
    {name: 'characters', link: 'characters'},
    {name: 'comics', link: 'comics'},
    {name: 'movies', link: 'movies'},
    {name: 'tv shows', link: 'shows'},
    {name: 'games', link: 'games'},
    {name: 'news', link: 'news'},
    {name: 'culture & lifestyle', link:'culture'},
    {name:'books', link: 'books'}
  ]);

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }



}
