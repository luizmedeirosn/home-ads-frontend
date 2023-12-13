import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { RatingModule } from 'primeng/rating';
import { TooltipModule } from 'primeng/tooltip';
import { SharedModule } from '../shared/shared.module';
import { ADS_ROUTES } from './ads.routing';
import { AdsListComponent } from './components/ads-list/ads-list.component';
import { NewAdFormComponent } from './components/new-ad-form/new-ad-form.component';
import { AdsHomeComponent } from './page/ads-home/ads-home.component';
import { AdViewComponent } from './components/ad-view/ad-view.component';
import { FieldsetModule } from 'primeng/fieldset';



@NgModule({
    declarations: [
        AdsHomeComponent,
        AdsListComponent,
        NewAdFormComponent,
        AdViewComponent
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
        FileUploadModule,
        FieldsetModule,
    ],
    providers: [
        DialogService,
        ConfirmationService,
    ]
})
export class AdsModule { }
