import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotaComponent } from './nota.component';

import { CalculoService } from '../shared';

@NgModule({
    declarations: [
        NotaComponent
    ],
    imports: [
        CommonModule
    ],
    providers: [
        CalculoService
    ]
})
export class NotaModule { }
