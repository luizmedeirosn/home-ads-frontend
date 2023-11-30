import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarNavigationComponent } from './components/sidebar-navigation/sidebar-navigation.component';

import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SidebarNavigationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    FontAwesomeModule,

    SidebarModule,
    ButtonModule,
  ],
  exports: [ SidebarNavigationComponent ]
})
export class SharedModule { }
