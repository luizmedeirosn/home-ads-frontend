import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AdsService } from 'src/app/services/ads/ads.service';

import { IconDefinition, faUpload } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Observable, Subject, of, takeUntil } from 'rxjs';
import { AdCategoryEnum } from 'src/app/models/enums/AdCategoriesEnum';
import { AdDataFullDTO } from 'src/app/models/interfaces/response/AdDataFullDTO';
import { CustomDialogService } from 'src/app/modules/shared/services/dialog/custom-dialog.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
    selector: 'app-new-ad-form',
    templateUrl: './new-ad-form.component.html',
    styleUrls: []
})
export class NewAdFormComponent implements OnDestroy {

    private readonly $destroy: Subject<void> = new Subject();

    public readonly faUploadIcon: IconDefinition = faUpload;
    public $viewSelectedImage: BehaviorSubject<boolean> = new BehaviorSubject(false);

    private priceValidadorAsync(control: AbstractControl): Observable<ValidationErrors | null> {
        const value: string = String(control.value);
        const validatorPattern: RegExp = /^\d+(\.\d{1,2})?$/;
        if (value.length <= 0 || value.length > 15 || !validatorPattern.test(value) || Number(value) < 1) {
            return of({ priceValidadorAsync: true });
        }
        return of(null);
    }

    public newAdForm = this.formBuilder.group({
        title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        comment: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(2000)]],
        averagePrice: ['', Validators.required, this.priceValidadorAsync],
        rating: ['', Validators.required],
        category: ['', Validators.required],
    });
    public image!: File;

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
        private customDialogService: CustomDialogService,
        private userService: UserService,
    ) { }


    public handleSubmitAddAd(): void {
        if (this.newAdForm?.valid && this.newAdForm?.value) {
            const selectedCategory = this.newAdForm.value.category as string;
            let categoryCode: number = 0;
            switch (selectedCategory) {
                case "Cama, mesa e banho":
                    categoryCode = 1;
                    break;
                case "Eletrodomésticos":
                    categoryCode = 2;
                    break;
                case "Móveis":
                    categoryCode = 3;
                    break;
                case "Ferramentas":
                    categoryCode = 4;
                    break;
            }

            const adResquest = {
                title: this.newAdForm.value.title as string,
                comment: this.newAdForm.value.comment as string,
                averagePrice: Number(String(this.newAdForm.value.averagePrice).replace(',', '.')),
                rating: Number(this.newAdForm.value.rating),
                categoryCode,
                publicationDate: new Date().toISOString(),
                image: this.image,
                userId: Number(this.userService.getUserId()),
            };

            this.adsSerivce.save(adResquest)
                .pipe(takeUntil(this.$destroy))
                .subscribe({
                    next: (newAd: AdDataFullDTO) => {
                        if (newAd) {
                            this.newAdForm.reset();
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Sucesso',
                                detail: 'Anúncio cadastrado com sucesso!',
                                life: 2500,
                            });

                            this.adsSerivce.$changesOn.next(true);
                            this.customDialogService.close();
                        }
                    },
                    error: (err) => {
                        console.log(err)
                        this.newAdForm.reset();
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erro',
                            detail: 'Não foi possível cadastrar o anúncio!',
                            life: 2500,
                        });
                        this.adsSerivce.$changesOn.next(false);
                        this.customDialogService.close();
                    }
                });
        }
    }

    public handleUploadAdImage($event: any): void {
        if ($event) {
            this.image = $event.target.files[0];
            this.$viewSelectedImage.next(true);
        }
    }

    public ngOnDestroy(): void {
        this.$destroy.next();
        this.$destroy.complete();
    }

}
