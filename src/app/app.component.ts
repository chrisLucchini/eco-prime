import { AfterViewInit, Component, ElementRef, Output, ViewChild } from '@angular/core';
import { PrimeService } from './core/services/prime.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Prestations } from './core/Model/Prestations';
import { PdfInfoComponent } from './pdf-info/pdf-info.component';
import { Foyer } from './core/Model/Foyer';
import { jsPDF } from 'jspdf';
import * as html2pdf from 'html2pdf.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'eco-prime';
  primeForm: FormGroup;
  prestations: Prestations;
  choixPrestation: string = 'Renov';

  choixTravaux: string;
  result: Foyer;

  @ViewChild(PdfInfoComponent, {read: ElementRef}) pdfInfo: ElementRef;

  constructor(private primeService: PrimeService, private formBuilder: FormBuilder) {

  }

  ngOnInit() {

    this.prestations = new Prestations();
    this.initForm();
  }

  ngAfterViewInit() {

    console.log(this.pdfInfo);
  }

  initForm() {
    this.primeForm = this.formBuilder.group({
      nbPersonnes: '',
      revenu: '',
      travaux: '',
      nbItem: '1'
    });

  }

  verifyPrestation(nomPresta) {

    return this.choixPrestation === nomPresta;

  }

  verifyChoice(choix): boolean {

    return this.choixTravaux === choix;
  }

  changePresta() {

    if(this.choixPrestation == 'Renov') {
      this.choixPrestation = 'Edf';

    } else {
      this.choixPrestation = 'Renov';
    }
    this.primeForm.controls['travaux'].reset();
  }

  submitPrime() {

    let nbPersonnes = this.primeForm.value.nbPersonnes;
    let revenu = this.primeForm.value.revenu;
    let travaux = this.primeForm.value.travaux;
    let nbItem = this.primeForm.value.nbItem;


    if(nbPersonnes && nbPersonnes && travaux) {
      this.result = this.primeService.calculPrime(nbPersonnes, revenu, travaux, nbItem, this.choixPrestation);
    }

  }

  onChangePresta(event) {

    this.choixTravaux = event.intitule.split(" ")[0];
  }

  refreshForm() {

    this.result = undefined;
  }

  public savePDF(): void {

    const option = {
      name: 'test.pdf',
      image: {type: 'jpeg'},
      html2canvas: { scale: 3 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    }
    const element = this.pdfInfo.nativeElement;
    element.style.display = 'block';

    html2pdf()
        .from(element)
        .set(option)
        .toPdf()
        .outputPdf()
        .save().then(()=>{
          element.style.display = 'none';
        });

    // const DATA = this.pdfInfo.nativeElement;
    // DATA.style.display = 'block';
    // const doc: jsPDF = new jsPDF("p", "px", "a4");
    // doc.html(DATA, {
    //   callback: (doc) => {
    //     doc.save();
    //   }
    // });

  }

}
