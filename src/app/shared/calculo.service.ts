import { Injectable } from '@angular/core';

import { INGREDIENTES } from './ingredientes';

@Injectable({
  providedIn: 'root'
})
export class CalculoService {

    private readonly ing = INGREDIENTES;

    constructor() { }

    calcular(lstIngredientes: any[][], desc?: boolean): number {

        if (typeof desc === "undefined") {
            desc = true;
        }

        let peso = 1;
        let valor = 0;
        
        let al = 0
        let bacon = 0;
        let carne = 0;
        let queijo = 0;

        for (let i = 0; i < lstIngredientes.length; i++) {
            let dados = lstIngredientes[i];
            let index: any = dados[0].toString();
            let qtd: any = parseInt(dados[1])    ;
            let calc: boolean = true;
            
            if ((index === '0') && (qtd > 0)) {
                bacon += qtd;
            }

            if ((index === '1') && (qtd > 0)) {
                carne += qtd;
            }

            if ((index === '2') && (qtd > 0)) {
                queijo += qtd;
            }

            if ((index === '4') && (qtd > 0)) {
                al += qtd;
            }

            while (((carne >= 3) || (queijo >= 3)) && (desc)) {
                if (carne >= 3) {
                    carne = carne - 3;
                    valor += (2 * this.ing[index][1]);
                }

                if (queijo >= 3) {
                    queijo = queijo - 3;
                    valor += (2 * this.ing[index][1]);
                }
                
                calc = false;
                qtd = 0;
            }
            
            if (calc) {
                valor += (qtd * this.ing[index][1]);
            }

        }

        if (((al > 0) && (bacon <= 0)) && (desc)) {
            peso = 0.9;
        }

        return (valor * peso);

    }
}