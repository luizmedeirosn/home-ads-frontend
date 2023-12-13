import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { CookieService } from 'ngx-cookie-service';
;

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { HttpClientModule } from '@angular/common/http';
import { DialogService } from 'primeng/dynamicdialog';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule,

        ToastModule,
    ],
    providers: [MessageService, CookieService, DialogService],
    bootstrap: [AppComponent]
})
export class AppModule { }
