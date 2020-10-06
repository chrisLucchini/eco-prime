import { Injectable } from '@angular/core';
import { Palier } from '../Model/Palier';
import { Prestations } from '../Model/Prestations';

@Injectable({
  providedIn: 'root'
})
export class PrimeService {

  palier: Palier;
  prestations: Prestations;

  constructor() {
    this.palier = new Palier();

   }

  calculPrime(nbPersonne: number, revenus: number, presta: any, nbItem: number) {

    console.log(nbPersonne);
    console.log(revenus);

    if(nbPersonne <= 5 && nbPersonne > 0) {

      let groupe = this.palier[nbPersonne].filter((elmt) => revenus >= elmt.min && revenus < elmt.max)[0];

      if(presta['intitule'] === "Fenetre" || presta['intitule'] === "Isolation des murs exterieurs" ) {
        return {
          prime: presta['prime'][groupe['couleur']] * nbItem,
          intitule: presta['intitule']
        };
      }

      return {
        prime: presta['prime'][groupe['couleur']],
        intitule: presta['intitule']
      };
    }
    else if(nbPersonne > 5) {
      let coeff = nbPersonne - 5;
      let newPalier = {
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
      }
      let groupe = newPalier['nbPers'].filter((elmt) => revenus >= elmt.min && revenus < elmt.max)[0];
      if(presta['intitule'] === "Fenetre" || presta['intitule'] === "Isolation des murs exterieurs" ) {
        return {
          prime: presta['prime'][groupe['couleur']] * nbItem,
          intitule: presta['intitule']
        };
      }
      return {
        prime: presta['prime'][groupe['couleur']],
        intitule: presta['intitule']
      };

    }
  }
}
