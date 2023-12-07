import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AdsService } from 'src/app/services/ads/ads-service.service';

import { FileUploadEvent } from 'primeng/fileupload';
import { Observable, of } from 'rxjs';
import { AdCategoryEnum } from 'src/app/models/enums/AdCategoriesEnum';
import { AdDataRequest } from 'src/app/models/interfaces/request/AdDataRequest';

@Component({
    selector: 'app-new-ad-form',
    templateUrl: './new-ad-form.component.html',
    styleUrls: []
})
export class NewAdFormComponent {
    private priceValidadorAsync(control: AbstractControl): Observable<ValidationErrors | null> {
        const value: string = String(control.value);
        const validatorPattern: RegExp = /^\d+(\.\d{3})*(,\d{1,2})?$/;
        if (value.length <= 0 || value.length > 15 || !validatorPattern.test(value)) {
            return of({ priceValidadorAsync: true });
        }
        return of(null);
    }

    public newAdForm = this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        description: ['', [Validators.required, Validators.minLength(40), Validators.maxLength(300)]],
        price: ['', Validators.required, this.priceValidadorAsync],
        rating: ['', Validators.required],
        category: ['', Validators.required],
    });
    private image!: File;

    public readonly categories = [
        AdCategoryEnum.BED_AND_BATH,
        AdCategoryEnum.APPLIANCES,
        AdCategoryEnum.FURNITURE,
        AdCategoryEnum.TOOLS
    ];

    public constructor(
        private formBuilder: FormBuilder,
        private dynamicDialogConfig: DynamicDialogConfig,
        private messageService: MessageService,

        private adsSerivce: AdsService,
    ) { }

    public handleSubmitAddAd(): void {
        if (this.newAdForm?.valid && this.newAdForm?.value) {
            const adResquest: AdDataRequest = {
                name: this.newAdForm.value.name as string,
                description: this.newAdForm.value.description as string,
                image: this.image,
                price: Number(this.newAdForm.value.price?.replace(',', '.')),
                rating: Number(this.newAdForm.value.rating),
                category:  this.newAdForm.value.category as AdCategoryEnum,
                userId: 1,
                userName: "Admin",
                userLocation: "Campina Grande - PB",
                publicationDate: new Date(),
            };

            this.adsSerivce.save(adResquest).then(
                (ad) => {
                    if (ad) {
                        this.newAdForm.reset();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Sucesso',
                            detail: 'Anúncio cadastrado com sucesso!',
                            life: 2500,
                        });
                    }
                }
            );
        }
    }

    addAdImage($event: FileUploadEvent) {
        throw new Error('Method not implemented.');
    }

}
