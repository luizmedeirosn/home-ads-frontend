import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './page/home-page.component';
import { RouterModule } from '@angular/router';
import { HOME_ROUTES } from './home.routing';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HOME_ROUTES),

    SharedModule,
  ]
})
export class HomeModule { }
