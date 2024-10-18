import { Component, signal } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { MatProgressSpinner, ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [
    MatProgressSpinner
  ],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {

  public color = signal<ThemePalette>('warn');
  public mode = signal<ProgressSpinnerMode>('indeterminate');
  public value = signal<number>(50);

}
