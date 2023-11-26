import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarNavigationComponent } from './components/sidebar-navigation/sidebar-navigation.component';

import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    SidebarNavigationComponent
  ],
  imports: [
    CommonModule,

    FontAwesomeModule,

    SidebarModule,
    ButtonModule,
  ],
  exports: [ SidebarNavigationComponent ]
})
export class SharedModule { }
