import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardapioComponent } from './cardapio.component';
import { CalculoService } from '../shared';

@NgModule({
    declarations: [
        CardapioComponent
    ],
    imports: [
        CommonModule
    ],
    providers: [
        CalculoService
    ]
})
export class CardapioModule { }
