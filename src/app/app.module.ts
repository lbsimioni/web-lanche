import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';    

import { AppComponent } from './app.component';
import { CardapioModule } from './cardapio';
import { MonteModule } from './monte';
import { NotaModule } from './nota';
import { PagamentoModule } from './pagamento';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        CardapioModule,
        MonteModule,
        NotaModule,
        PagamentoModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
