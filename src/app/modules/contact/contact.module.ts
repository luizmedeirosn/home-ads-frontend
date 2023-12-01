import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactHomeComponent } from './page/contact-home/contact-home.component';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CONTACT_ROUTES } from './contact.routing';



@NgModule({
  declarations: [
    ContactHomeComponent,
    ContactFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CONTACT_ROUTES),

    SharedModule
  ]
})
export class ContactModule { }
