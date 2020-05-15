import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CalculoService, INGREDIENTES } from '../shared';

@Component({
  selector: 'app-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.css']
})
export class NotaComponent implements OnInit {

    ing = INGREDIENTES;

    readonly rotaCardapio: string = 'cardapio';
    readonly rotaMonte: string = 'monte';
    readonly rotaPagar: string = 'pagamento';

    pedido: any;
    lst: any[][] = [];

    constructor(
        private service: CalculoService,
        private router: Router
    ) { }

    ngOnInit() {
        this.pedido = localStorage['pedido'];
        this.arrumarArray();
    }

    arrumarArray(): void {
        for (let i = 0; i < this.pedido.length; i = i+4) {
            let f = this.pedido.substr(i, 1);
            let l = this.pedido.substr(i+2, 1);
            this.lst.push([f, l]);
        };  
    }

    name(value: string): string {
        let n: string = this.ing[value][0];
        return (n.charAt(0).toUpperCase()) + n.substring(1, n.length);
    }

    calcular(value?: any): number {
        if (typeof value !== "undefined") {
            return this.service.calcular(value, false);
        }
        return this.service.calcular(this.lst);
    }
    
    calcularDesconto(): number {
        let vt = this.calcular(this.lst);
        let vf = this.calcular();
        return (vt - vf);
    }

    voltar(): void {
        let before = localStorage['local'];
        if ((before === '1') || (before === 1)) {
            this.router.navigate([this.rotaMonte]);
        } else {
            this.router.navigate([this.rotaCardapio]);
        }
    }

    pagar(): void {
        localStorage['price'] = this.calcular();
        this.router.navigate([this.rotaPagar]);
    }

}
