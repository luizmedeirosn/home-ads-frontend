import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SidebarNavigationComponent } from './components/sidebar-navigation/sidebar-navigation.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogService } from 'primeng/dynamicdialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { SidebarModule } from 'primeng/sidebar';
import { FormControlAlertComponent } from './components/form-control-alert/form-control-alert.component';
import { LoadingComponent } from './components/loading/loading.component';
import { SigninComponent } from './components/signin/signin/signin.component';
@NgModule({
    declarations: [
        SidebarNavigationComponent,
        FormControlAlertComponent,
        LoadingComponent,
        SigninComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,

        FontAwesomeModule,

        SidebarModule,
        ButtonModule,
        CardModule,
        ProgressBarModule,
    ],
    exports: [SidebarNavigationComponent, FormControlAlertComponent, LoadingComponent],
    providers: [DialogService]
})
export class SharedModule { }
