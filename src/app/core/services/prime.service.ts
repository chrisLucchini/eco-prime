import { Injectable } from '@angular/core';
import { Palier } from '../Model/Palier';
import { Prestations } from '../Model/Prestations';
import { Foyer } from '../Model/Foyer';

@Injectable({
  providedIn: 'root'
})
export class PrimeService {

  palier: Palier;
  newPalier: any;
  prestations: Prestations;

  constructor() {


   }

  /**
   * Methode pour calculer la prime renov
   * @param nbPersonne
   * @param revenus
   * @param presta
   * @param nbItem
   */
  calculPrime(nbPersonne: number, revenus: number, presta: any, nbItem: number, nomPrime = 'Renov') {

    this.verifyPrime(nomPrime);

    if(nbPersonne <= 5 && nbPersonne > 0) {

      let groupe = this.palier.prime[nbPersonne].filter((elmt) => revenus >= elmt.min && revenus < elmt.max)[0];

      if(presta['intitule'] === "Fenetre" || presta['intitule'] === "Isolation des murs exterieurs" ) {
        return new Foyer(presta['prime'][groupe['couleur']] * nbItem, presta['intitule'], nbPersonne, nbItem, revenus, nomPrime);
      }

      return new Foyer(presta['prime'][groupe['couleur']], presta['intitule'], nbPersonne, nbItem, revenus, nomPrime);
    }
    else if(nbPersonne > 5) {

      this.genereNewPalier(nbPersonne, nomPrime);
      let groupe = this.newPalier['nbPers'].filter((elmt) => revenus >= elmt.min && revenus < elmt.max)[0];
      if(presta['intitule'] === "Fenetre" || presta['intitule'] === "Isolation des murs exterieurs" ) {
        return new Foyer(presta['prime'][groupe['couleur']] * nbItem, presta['intitule'], nbPersonne, nbItem, revenus, nomPrime);
      }
      return new Foyer(presta['prime'][groupe['couleur']], presta['intitule'], nbPersonne, nbItem, revenus, nomPrime);

    }
  }

  verifyPrime(nomPrime = 'Renov') {

    this.palier = new Palier(nomPrime);

  }

  genereNewPalier(nbPersonne, nomPrime) {
    let coeff = nbPersonne - 5;
    this.newPalier =  {
      nbPers: [
        {
          couleur: 'Bleu',
          min: 0,
          max: 34993 + (4412 * coeff)
        },
        {
          couleur: 'Jaune',
          min: 34993 + (4412 * coeff),
          max: 44860 + (5651 * coeff)
        },
        {
          couleur: 'Violet',
          min: 44860 + (5651 * coeff),
          max: 69081 + (8744 * coeff)
        },
        {
          couleur: 'Rose',
          min: 69081 + (8744 * coeff),
          max: Infinity
        }
      ]
    };
    if(nomPrime == 'Edf') {
      this.newPalier['nbPers'] = this.newPalier['nbPers']
                                  .filter((elmt) => elmt.couleur !== 'Rose')
                                  .map((e) => {
                                    if(e.couleur === 'Violet'){e.max = Infinity;} return e;
                                  });
    }
  }
}
