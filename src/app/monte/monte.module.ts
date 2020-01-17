import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  

import { MonteComponent } from './monte.component';
import { CalculoService } from '../shared';

@NgModule({
    declarations: [
        MonteComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [
        CalculoService
    ]
})
export class MonteModule { }
