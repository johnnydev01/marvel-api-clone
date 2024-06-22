import { Routes } from "@angular/router";
import { CharactersPage } from "./containers/characters.page";

export const CHARACTERS_ROUTES: Routes = [
  {
    path: '',
    component: CharactersPage,
    title: 'Characters',
  }
];
