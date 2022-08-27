import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Comic } from 'src/app/shared/models/comics.model';
import { ComicsService } from '../services/comics.service';


@Component({
  selector: 'app-comics',
  templateUrl: './comics.page.html',
  styleUrls: ['./comics.page.scss']
})
export class ComicsPage implements OnInit {

  comics$: Observable<Comic[]>;

  constructor(private comicsService: ComicsService) { }

  ngOnInit(): void {

    this.comics$ = this.comicsService.getComics();
  }



}
