import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class PagamentoComponent implements OnInit {

    private readonly rotaNota = 'nota';

    private valor:number = 0;

    constructor(
        private router: Router
    ) { }

    ngOnInit() {
        this.valor = localStorage['price'];
    }

    pagar(message: string): void {
        confirm('Deseja mesmo pagar em ' + message);
    }

    voltar(): void {
        this.router.navigate([this.rotaNota]);
    }

}
