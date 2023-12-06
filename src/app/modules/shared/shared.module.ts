import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SidebarNavigationComponent } from './components/sidebar-navigation/sidebar-navigation.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { SidebarModule } from 'primeng/sidebar';
import { FormControlAlertComponent } from './components/form-control-alert/form-control-alert.component';

@NgModule({
  declarations: [
    SidebarNavigationComponent,
    FormControlAlertComponent,
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
  ],
  exports: [ SidebarNavigationComponent, FormControlAlertComponent ]
})
export class SharedModule { }
