import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './page/home-page.component';
import { RouterModule } from '@angular/router';
import { HOME_ROUTES } from './home.routing';

import { SharedModule } from '../shared/shared.module';

import { AdsCarouselComponent } from './components/ads-carousel/ads-carousel.component';

import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { RatingModule } from 'primeng/rating';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    HomePageComponent,
    AdsCarouselComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HOME_ROUTES),
    FormsModule,
    ReactiveFormsModule,

    SharedModule,

    FontAwesomeModule,

    CardModule,
    CarouselModule,
    ButtonModule,
    RatingModule,
    InputNumberModule,

  ]
})
export class HomeModule { }
