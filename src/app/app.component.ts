import { Component } from '@angular/core';
import { PrimeService } from './core/services/prime.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'eco-prime';

  constructor(private primeService: PrimeService) {

  }
}
