import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TooltipModule } from 'primeng/tooltip';
import { SharedModule } from '../shared/shared.module';
import { ContactFormComponent } from './contact-form/contact-form.component';
import { CONTACT_ROUTES } from './contact.routing';
import { ContactHomeComponent } from './page/contact-home/contact-home.component';



@NgModule({
  declarations: [
    ContactHomeComponent,
    ContactFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CONTACT_ROUTES),
    FormsModule,
    ReactiveFormsModule,

    SharedModule,

    FontAwesomeModule,

    AnimateOnScrollModule,
    CardModule,
    InputTextModule,
    InputMaskModule,
    InputTextareaModule,
    ButtonModule,
    TooltipModule,

  ]
})
export class ContactModule { }
