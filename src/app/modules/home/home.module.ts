import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './page/home-page.component';
import { RouterModule } from '@angular/router';
import { HOME_ROUTES } from './home.routing';

import { SharedModule } from '../shared/shared.module';

import { AdsCarouselComponent } from './components/ads-carousel/ads-carousel.component';


import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';


@NgModule({
  declarations: [
    HomePageComponent,
    AdsCarouselComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HOME_ROUTES),

    SharedModule,

    CarouselModule,
    TagModule,
    ButtonModule,
  ]
})
export class HomeModule { }
