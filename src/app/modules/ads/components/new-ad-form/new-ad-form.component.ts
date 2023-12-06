import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';

import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Observable, of } from 'rxjs';

@Component({
    selector: 'app-new-ad-form',
    templateUrl: './new-ad-form.component.html',
    styleUrls: []
})
export class NewAdFormComponent {
    public readonly categories = [
        { category: 'Cama, mesa e banho' },
        { category: 'Eletrodomésticos' },
        { category: 'Móveis' },
        { category: 'Ferramentas' },
    ];

    private priceValidadorAsync(control: AbstractControl): Observable<ValidationErrors | null> {
        // fazer a validação
        return of(null);
    }

    public newAdForm = this.formBuilder.group({
        name: [ '', [ Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        description: [ '', [Validators.required, Validators.minLength(50), Validators.maxLength(300)]],
        image: null,
        price: [ '', Validators.required, this.priceValidadorAsync ],
        rating: [ '', Validators.required ],
        category: [ '', Validators.required ],
    });

    public constructor(
        private formBuilder: FormBuilder,
        private dynamicDialogConfig: DynamicDialogConfig,
    ) { }

    public handleSubmitAddAd(): void {
        console.log(this.newAdForm);
    }
}
