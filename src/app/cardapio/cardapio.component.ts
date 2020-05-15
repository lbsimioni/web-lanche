import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CalculoService, INGREDIENTES} from '../shared';
import { isString, isArray } from 'util';

@Component({
  selector: 'app-cardapio',
  templateUrl: './cardapio.component.html',
  styleUrls: ['./cardapio.component.css']
})
export class CardapioComponent implements OnInit {

    readonly ing = INGREDIENTES;
    readonly rotaNota: string = 'nota';
    readonly rotaMonte: string = 'monte';
    historico: any[][][] = [];

    readonly lstLanches: string[][] = [['X-Bacon', '0'], ['X-Burger', '1'], ['X-Egg', '2'], ['X-Egg Bacon', '3']];

    readonly conjIngredientes: any[][][] = [[['0', 1], ['1', 1], ['2', 1]], [['1', 1], ['2', 1]], [['3', 1], ['1', 1], ['2', 1]], [['3', 1], ['0', 1], ['1', 1], ['2', 1]]];

    constructor(
        private service: CalculoService,
        private router: Router) { }

    ngOnInit() { 
        this.arrumarHistorico();
    }

    name(value: string): string {
        let n: string = this.ing[value][0];
        return (n.charAt(0).toUpperCase()) + n.substring(1, n.length);
    }


    calcular(value: any): number {
        let lst;

        if (!isArray(value)) {
            lst = this.conjIngredientes[value];
        } else {
            lst = value;
        }

        return this.service.calcular(lst);
    }

    personalizar(): void {
        this.router.navigate([this.rotaMonte]);
    }

    comprar(value: any): void {
        let lst: any[][];

        if (!isArray(value)) {
            lst = this.conjIngredientes[value];
        } else {
            lst = value;
        }

        localStorage['pedido'] = lst.toString();
        localStorage['local'] = '0';
        this.router.navigate([this.rotaNota]);
    }

    arrumarHistorico(): void {
        if ((isString(localStorage['historicoPedidos'])) && (localStorage['historicoPedidos'] !== '')) {
            let h: string = localStorage['historicoPedidos'].toString();

            let a: string[][] = [];

            for (let i = 0; i < h.length; i = i + 4) {
                let f = h.substr(i, 1);
                let l = h.substr(i + 2, 1);

                if (f === '/') {
                    this.historico.push(a);
                    i = i-2;
                    a = [];
                    if (this.historico.length >= 4) {
                        return;
                    }
                } else {
                    a.push([f, l]);
                }

            };

        }
        
    }

    gerarIngredientes(value: any): string {
        let lst;

        if (!isArray(value)) {
            lst = this.conjIngredientes[value];
        } else {
            lst = value;
        }

        let msg: string = '';

        for (let i = 0; i < lst.length; i++) {
            if ((i > 0) && (i < (lst.length - 1))) {
                msg = msg + ', ';
            }

            if ((i === (lst.length - 1)) && (lst.length > 1)) {
                msg = msg + ' e ';
            }

            if (i <= 0) {
                let t: string = this.ing[lst[i][0]][0];
                msg = (msg + lst[i][1] + " " + t.charAt(0).toUpperCase()) + t.substring(1, t.length);
            } else {
                msg = (msg + lst[i][1] + " " + this.ing[lst[i][0]][0]);
            }


        }

        return msg;
    }

    exists(): boolean {
        return (this.historico.length > 0);
    }

}
