import { Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
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
    this.prestations = new Prestations();
   }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges){

    if(this.info){
      console.log(this.info.nomPrime);
      this.palierinfo = new Palier(this.info.nomPrime);
    }
  }

  verifyPrime(nomPrime) {

    if(this.info){
      return nomPrime === this.info.nomPrime;

    }
  }

  verifyInfinity(montant) {

    return montant === Infinity;
  }

}
