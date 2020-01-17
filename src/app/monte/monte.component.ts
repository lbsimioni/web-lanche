import { isString } from 'util';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { INGREDIENTES, REGRAS, CalculoService } from '../shared';

@Component({
  selector: 'app-monte',
  templateUrl: './monte.component.html',
  styleUrls: ['./monte.component.css']
})
export class MonteComponent implements OnInit {

    form: FormGroup;

    private readonly ing = INGREDIENTES;
    private readonly lstRegras = REGRAS;

    private readonly rotaCardapio = 'cardapio';
    private readonly rotaNota = 'nota';

    private total = 0;

    private qtd: any[][];

    constructor(
        private service: CalculoService,
        private router: Router
    ) { }

    ngOnInit() {
        this.initForm();
    }

    private initForm(): void {
        this.form = new FormGroup({
            '0': new FormControl(''),
            '1': new FormControl(''),
            '2': new FormControl(''),
            '3': new FormControl(''),
            '4': new FormControl('')
        });
        this.form.valueChanges.subscribe(
            (value: any) => {
                this.calcular();
            })
    }

    name(value: string): string {
        return (value.charAt(0).toUpperCase()) + value.substring(1, value.length);
    }

    gerarLst(): any[][] {
        let lst: any[][] = [];
        let v = this.form.value;
        for (let i = 0; i < 5; i++) {
            if (((v[i] !== '') || (v[i] !== null)) && (v[i] > 0)) {
                lst.push([i, v[i]])
            }
        }
        return lst;
    }

    calcular(): void {
        let lst = this.gerarLst();

        this.total = this.service.calcular(lst);
    }

    cardapio(): void {
        this.router.navigate([this.rotaCardapio]);
    }

    comprar(): void {
        let lst = this.gerarLst();
        if (lst.length > 0) {
            localStorage['pedido'] = lst.toString();

            let msg: string = "";

            if ((isString(localStorage['historicoPedidos'])) && (localStorage['historicoPedidos'] !== '')) {
                msg += localStorage['historicoPedidos'];
            }

            localStorage['historicoPedidos'] = lst.toString() + ',/,' + msg;
            localStorage['local'] = '1';
            this.router.navigate([this.rotaNota]);
        } else {
            alert('Não há nenhum item selecionado!');
        }
        
    }

}
