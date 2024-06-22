

import { Routes } from "@angular/router";
import { ComicsPage } from "./containers/comics.page";

export const COMICS_ROUTES: Routes = [
  {
    path: '',
    component: ComicsPage,
    title: 'Comics',
  }
];
