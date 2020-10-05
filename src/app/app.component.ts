import { Component } from '@angular/core';
import { PrimeService } from './core/services/prime.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { Prestations } from './core/Model/Prestations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'eco-prime';
  primeForm: FormGroup;
  prestations: Prestations;
  result: any;

  constructor(private primeService: PrimeService, private formBuilder: FormBuilder) {

  }

  ngOnInit() {

    this.prestations = new Prestations();
    this.initForm();
  }

  initForm() {
    this.primeForm = this.formBuilder.group({
      nbPersonnes: '',
      revenu: '',
      travaux: '',
      nbItem: ''
    });

  }

  submitPrime() {

    let nbPersonnes = this.primeForm.value.nbPersonnes;
    let revenu = this.primeForm.value.revenu;
    let travaux = this.primeForm.value.travaux;

    console.log(nbPersonnes);
    console.log(travaux.intitule);

    if(nbPersonnes && nbPersonnes && travaux) {
      this.result = this.primeService.calculPrime(nbPersonnes, revenu, travaux);

    }

  }

}
