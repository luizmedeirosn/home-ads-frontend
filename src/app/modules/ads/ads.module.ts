import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { RatingModule } from 'primeng/rating';
import { SharedModule } from '../shared/shared.module';
import { ADS_ROUTES } from './ads.routing';
import { AdsListComponent } from './components/ads-list/ads-list.component';
import { AdsHomeComponent } from './page/ads-home/ads-home.component';



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
    InputTextModule,
    DropdownModule,

  ]
})
export class AdsModule { }
