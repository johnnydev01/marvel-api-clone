import { Routes } from '@angular/router';
import { CharactersStore } from './pages/characters/store/characters.store';
import { ComicsStore } from './pages/comics/store/comics.store';


type PathMatch = "full" | "prefix" | undefined;


export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'characters',
    pathMatch: 'full' as PathMatch,
  },
  {
    path: 'characters',
    loadComponent: () => import('./pages/characters/containers/characters.page').then(c => c.CharactersPage),
    title: 'Characters Page',
    providers: [CharactersStore]
  },
  {
    path: 'comics',
    loadComponent: () => import('./pages/comics/containers/comics.page').then(c => c.ComicsPage),
    title: 'Comics Page',
    providers: [ComicsStore]
  }
];

