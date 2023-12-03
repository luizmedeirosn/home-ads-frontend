import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdsHomeComponent } from './page/ads-home/ads-home.component';
import { RouterModule } from '@angular/router';
import { ADS_ROUTES } from './ads.routing';
import { SharedModule } from '../shared/shared.module';
import { AdsListComponent } from './components/ads-list/ads-list.component';
import { CardModule } from 'primeng/card';
import { RatingModule } from 'primeng/rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator'



@NgModule({
  declarations: [
    AdsHomeComponent,
    AdsListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ADS_ROUTES),
    FormsModule,
    ReactiveFormsModule,

    FontAwesomeModule,

    SharedModule,

    CardModule,
    RatingModule,
    ButtonModule,
    PaginatorModule,
  ]
})
export class AdsModule { }
