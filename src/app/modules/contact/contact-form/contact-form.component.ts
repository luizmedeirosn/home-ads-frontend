import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IconDefinition, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: [],
})
export class ContactFormComponent {

    public readonly faEmailIcon: IconDefinition = faEnvelope;
    public readonly faPhoneNumberIcon: IconDefinition = faPhone;


    public contactForm = this.formBuilder.group({
        name: [ '', [Validators.minLength(3), Validators.maxLength(50)] ],
        phoneNumber: [ '', Validators.required ],
        subject: [ '', [Validators.minLength(10), Validators.maxLength(50)] ],
        message: [ '', [ Validators.minLength(50), Validators.maxLength(500)] ]
    });

    constructor(
        private formBuilder: FormBuilder,
        private messageService: MessageService
    ) {}

    public handleSubmitContactForm() {
        if (this.contactForm.valid) {
            this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Menssagem enviada com sucesso, entraremos em contato em breve!',
                life: 6000
            })
            this.contactForm.reset()
        }
    }
}
