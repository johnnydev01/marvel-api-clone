import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ComicsEntityService } from '../../services/comics-entity.service';

@Component({
  selector: 'app-comics-item',
  standalone: true,
  imports: [],
  templateUrl: './comics-item.component.html',
  styleUrl: './comics-item.component.scss'
})
export class ComicsItemComponent {
  private comicsService = inject(ComicsEntityService);


  public comics = toSignal(this.comicsService.entities$);

}
