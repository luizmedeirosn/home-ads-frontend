import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdsHomeComponent } from './page/ads-home/ads-home.component';
import { RouterModule } from '@angular/router';
import { ADS_ROUTES } from './ads.routing';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    AdsHomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ADS_ROUTES),

    SharedModule
  ]
})
export class AdsModule { }
