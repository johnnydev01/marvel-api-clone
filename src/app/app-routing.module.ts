import { CharactersPage } from './pages/characters/containers/characters.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

type PathMatch = "full" | "prefix" | undefined;

const routes: Routes = [
  {
    path: '',
    redirectTo: 'characters',
    pathMatch: 'full' as PathMatch,
  },
  {
    path: 'characters',
    loadChildren: () => import('./pages/characters/characters.module').then(m => m.CharactersModule),
  },
  {
    path: 'comics',
    loadChildren: () => import('./pages/comics/comics.module').then(m => m.ComicsModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
