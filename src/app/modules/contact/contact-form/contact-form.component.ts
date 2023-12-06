import { Component } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    ValidationErrors,
    Validators,
} from '@angular/forms';
import {
    IconDefinition,
    faEnvelope,
    faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-contact-form',
    templateUrl: './contact-form.component.html',
    styleUrls: [],
})
export class ContactFormComponent {
    public readonly faEmailIcon: IconDefinition = faEnvelope;
    public readonly faPhoneNumberIcon: IconDefinition = faPhone;

    private minLengthValidadorAsync(control: AbstractControl): Observable<ValidationErrors | null> {
        const s: string = String(control.value).replace(/[()\-_ ]/g, '');
        if (s.length !== 11) {
            return of({ minLengthValidador: true, requiredValue: 11 });
        }
        return of(null);
    }

    public contactForm = this.formBuilder.group({
        name: [
            '',
            [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50),
            ],
        ],
        phoneNumber: ['', Validators.required, this.minLengthValidadorAsync],
        subject: [
            '',
            [
                Validators.required,
                Validators.minLength(10),
                Validators.maxLength(50),
            ],
        ],
        message: [
            '',
            [
                Validators.required,
                Validators.minLength(50),
                Validators.maxLength(500),
            ],
        ],
    });

    public constructor(
        private formBuilder: FormBuilder,
        private messageService: MessageService
    ) {}

    public handleSubmitContactForm() {
        if (this.contactForm.valid) {
            console.log(this.contactForm.value);
            this.messageService.add({
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Menssagem enviada com sucesso, entraremos em contato em breve!',
                life: 6000,
            });
            this.contactForm.reset();
        }
    }
}
