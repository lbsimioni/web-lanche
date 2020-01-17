import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardapioComponent } from './cardapio';
import { MonteComponent } from './monte';
import { NotaComponent } from './nota';
import { PagamentoComponent} from './pagamento';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'cardapio',
        pathMatch: 'full'
    },
    {
        path: 'cardapio',
        component: CardapioComponent
    },
    {
        path: 'monte',
        component: MonteComponent
    },
    {
        path: 'nota',
        component: NotaComponent
    },
    {
        path: 'pagamento',
        component: PagamentoComponent
    }

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }
