import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AdsService } from 'src/app/services/ads/ads.service';

import { FileUploadEvent } from 'primeng/fileupload';
import { Observable, of } from 'rxjs';
import { AdCategoryEnum } from 'src/app/models/enums/AdCategoriesEnum';
import { AdDataRequest } from 'src/app/models/interfaces/request/AdDataRequest';
import { CustomDialogService } from 'src/app/modules/shared/services/dialog/custom-dialog.service';

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
        title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        comment: ['', [Validators.required, Validators.minLength(40), Validators.maxLength(1000)]],
        averagePrice: ['', Validators.required, this.priceValidadorAsync],
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
        private adsSerivce: AdsService,
        private messageService: MessageService,
        private formBuilder: FormBuilder,
        private dynamicDialogConfig: DynamicDialogConfig,
        private customDialogService: CustomDialogService,
    ) { }


    public handleSubmitAddAd(): void {
        if (this.newAdForm?.valid && this.newAdForm?.value) {
            const adResquest: AdDataRequest = {
                title: this.newAdForm.value.title as string,
                comment: this.newAdForm.value.comment as string,
                image: this.image,
                averagePrice: Number(this.newAdForm.value.averagePrice?.replace(',', '.')),
                rating: Number(this.newAdForm.value.rating),
                category: this.newAdForm.value.category as AdCategoryEnum,
                userName: "Admin",
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

            this.customDialogService.close();
        }
    }

    public addAdImage($event: FileUploadEvent): void {
        throw new Error('Method not implemented.');
    }

}
