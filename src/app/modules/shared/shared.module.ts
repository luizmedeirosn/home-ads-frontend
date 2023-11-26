import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarNavigationComponent } from './components/sidebar-navigation/sidebar-navigation.component';



@NgModule({
  declarations: [
    SidebarNavigationComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [ SidebarNavigationComponent ]
})
export class SharedModule { }
