import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CalculoService, INGREDIENTES} from '../shared';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.css']
})
export class CardapioComponent implements OnInit {

    private readonly ing = INGREDIENTES;
    private readonly rotaNota = 'nota';
    private readonly rotaMonte = 'monte';

    private readonly lstLanches: string[][] = [['X-Bacon', '0'], ['X-Burger', '1'], ['X-Egg', '2'], ['X-Egg Bacon', '3']];

    private readonly conjIngredientes: string[][] = [['0', '1', '2'], ['1', '2'], ['3', '1', '2'], ['3', '0', '1', '2']];

    constructor(
        private service: CalculoService,
        private router: Router) { }

    ngOnInit() {
    }

    gerarIngredientes(index: any): string {
        let lst: string[] = this.conjIngredientes[index];
        let msg: string = '';
        
        for (let i = 0; i < lst.length; i++) {
            if ((i > 0) && (i < (lst.length - 1)) ) {
                msg = msg + ', ';
            }

            if (i === (lst.length - 1)) {
                msg = msg + ' e ';
            }

            if (i <= 0 ) {
                let t: string = this.ing[lst[i]][0];
                msg = (msg + t.charAt(0).toUpperCase()) + t.substring(1, t.length);
            } else {
                msg = msg + this.ing[lst[i]][0];
            }

        }

        return msg;
    }

    arrumarArray(array: any): any {
        let lst: any[][] = [];

        array.forEach(i => {
            lst.push([i, 1]);
        });

        return lst;
    }

    calcular(index: any): number {
        let lstIngredientes: any[] = this.conjIngredientes[index];
        let lst = this.arrumarArray(lstIngredientes);

        return this.service.calcular(lst);
    }

    personalizar(): void {
        this.router.navigate([this.rotaMonte]);
    }

    comprar(index: any): void {
        let lstIngredientes: any[] = this.conjIngredientes[index];
        let lst = this.arrumarArray(lstIngredientes);

        localStorage['pedido'] = lst.toString();
        localStorage['local'] = '0';
        this.router.navigate([this.rotaNota]);
    }

}
