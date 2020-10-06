import { Component, Input, OnInit } from '@angular/core';
import { Foyer } from '../core/Model/Foyer';
import {Palier} from '../core/Model/Palier';
import {Prestations} from '../core/Model/Prestations';

@Component({
  selector: 'app-pdf-info',
  templateUrl: './pdf-info.component.html',
  styleUrls: ['./pdf-info.component.scss'],
  host: {
    style: 'display: none'
  }
})
export class PdfInfoComponent implements OnInit {

  @Input() info: Foyer;
  palierinfo : Palier;
  prestations : Prestations;

  constructor() {
    this.palierinfo = new Palier();
    this.prestations = new Prestations();
   }

  ngOnInit(): void {
  }

  verifyInfinity(montant) {

    return montant === Infinity;
  }

}
