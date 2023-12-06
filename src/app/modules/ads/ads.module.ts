import { ConfirmationService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { PaginatorModule } from 'primeng/paginator';
import { RatingModule } from 'primeng/rating';
import { TooltipModule } from 'primeng/tooltip';
import { SharedModule } from '../shared/shared.module';
import { ADS_ROUTES } from './ads.routing';
import { AdsListComponent } from './components/ads-list/ads-list.component';
import { NewAdFormComponent } from './components/new-ad-form/new-ad-form.component';
import { AdsHomeComponent } from './page/ads-home/ads-home.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';



@NgModule({
  declarations: [
    AdsHomeComponent,
    AdsListComponent,
    NewAdFormComponent
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
    InputTextModule,
    InputMaskModule,
    PaginatorModule,
    DropdownModule,
    TooltipModule,
    DynamicDialogModule,
    ConfirmDialogModule,
  ],
  providers: [
    DialogService,
    ConfirmationService
  ]
})
export class AdsModule { }
