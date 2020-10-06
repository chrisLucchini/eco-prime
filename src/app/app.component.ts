import { AfterViewInit, Component, ElementRef, Output, ViewChild } from '@angular/core';
import { PrimeService } from './core/services/prime.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Prestations } from './core/Model/Prestations';
import { PdfInfoComponent } from './pdf-info/pdf-info.component';
import * as html2pdf from 'html2pdf.js';
import { Foyer } from './core/Model/Foyer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'eco-prime';
  primeForm: FormGroup;
  prestations: Prestations;
  choice: string;
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

  verifyChoice(choice): boolean {

    return this.choice === choice;
  }

  submitPrime() {

    let nbPersonnes = this.primeForm.value.nbPersonnes;
    let revenu = this.primeForm.value.revenu;
    let travaux = this.primeForm.value.travaux;
    let nbItem = this.primeForm.value.nbItem;

    console.log(nbPersonnes);
    console.log(travaux.intitule);

    if(nbPersonnes && nbPersonnes && travaux) {
      this.result = this.primeService.calculPrime(nbPersonnes, revenu, travaux, nbItem);
      if(this.result) {

        this.SavePDF();
      }

    }

  }

  onChangePresta(event) {

    this.choice = event.intitule.split(" ")[0];
  }

  refreshForm() {

    this.result = undefined;
  }

  public SavePDF(): void {

    const option = {
      name: 'test.pdf',
      image: {type: 'jpeg'},
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }
    const element = this.pdfInfo.nativeElement;
    element.style.display = 'block';

    console.log(element);
    html2pdf()
        .from(element)
        .set(option)
        .toPdf()
        .outputPdf().then(res => {
          console.log(res)
        }).save();

  }

}
