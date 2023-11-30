import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsHomeComponent } from './page/about-us-home/about-us-home.component';
import { RouterModule } from '@angular/router';
import { ABOUT_US_ROUTES } from './about-us.routing';
import { SharedModule } from '../shared/shared.module';
import { AboutUsDescriptionComponent } from './components/about-us-description/about-us-description.component';

@NgModule({
    declarations: [
        AboutUsHomeComponent,
        AboutUsDescriptionComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(ABOUT_US_ROUTES),

        SharedModule,
    ],
})
export class AboutUsModule { }
