import { Component } from '@angular/core';
import { EntityDataModule } from '@ngrx/data';
import { entityConfig } from './entity-metadata';
import { HeaderComponent } from './shared/components/header/header.component';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [
        HeaderComponent
    ]
})
export class AppComponent {
  title = 'marvel-api-clone';

}

