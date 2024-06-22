import { Routes, provideRouter } from '@angular/router';


type PathMatch = "full" | "prefix" | undefined;


export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'characters',
    pathMatch: 'full' as PathMatch,
  },
  {
    path: 'characters',
    loadChildren: () => import('./pages/characters/characters.routes').then(m => m.CHARACTERS_ROUTES),
    title: 'Characters Page',
  },
  {
    path: 'comics',
    loadChildren: () => import('./pages/comics/comics.routes').then(m => m.COMICS_ROUTES),
    title: 'Comics Page',
  }
];

