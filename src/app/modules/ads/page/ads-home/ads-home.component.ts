import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { AdCategoryEnum } from 'src/app/models/enums/AdCategoriesEnum';
import { AdDataMinResponse } from 'src/app/models/interfaces/response/AdDataMinResponse';
import { CustomDialogService } from 'src/app/modules/shared/services/dialog/custom-dialog.service';
import { AdsService } from 'src/app/services/ads/ads.service';
import { NewAdFormComponent } from '../../components/new-ad-form/new-ad-form.component';

@Component({
    selector: 'app-ads-home',
    templateUrl: './ads-home.component.html',
    styleUrls: []
})
export class AdsHomeComponent implements OnInit, OnDestroy {
    private $destroy: Subject<void> = new Subject();

    public $loaded: BehaviorSubject<boolean> = new BehaviorSubject(false);

    public totalAds!: Array<AdDataMinResponse>;
    public adsPage!: Array<AdDataMinResponse>;

    public dynamicDialogRef!: DynamicDialogRef;

    public constructor(
        private adsService: AdsService,
        private messageService: MessageService,
        private customDialogService: CustomDialogService,

    ) { }

    public ngOnInit(): void {
        setTimeout(() => {
            this.$loaded.next(true);
            this.messageService.clear();
            this.messageService.add({
                key: 'adsToast',
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Anúncios carregados com sucesso!',
                life: 2500,
            });
        }, 1500)

        this.adsService.findAllAds().then(
            (ads) => {
                if (ads.length > 0) {
                    this.totalAds = ads;
                    this.adsPage = ads.slice(0, 8);
                }
            }
        );
    }

    private setAllAdsWithApi(): void {
        this.adsService.findAllAds().then(
            (ads) => {
                if (ads.length > 0) {
                    this.totalAds = ads;
                    this.adsPage = ads.slice(this.totalAds.length - 8, this.totalAds.length);
                }
            }
        );
    }

    public handleOnInputChangeAction($event: { keyWord: string }): void {
        if ($event) {
            this.adsService.findByKeyWord($event.keyWord).then(
                (ads) => {
                    this.totalAds = ads;
                    this.adsPage = ads.slice(0, 8);
                }
            );
        }
    }

    public handleOnDropdownChangeAction($event: { category: AdCategoryEnum | undefined; }): void {
        if ($event?.category) {
            this.adsService.findByCategory($event.category).then(
                (ads) => {
                    this.totalAds = ads;
                    this.adsPage = ads.slice(0, 8);
                }
            );
        } else {
            this.adsService.findAllAds().then(
                (ads) => {
                    this.totalAds = ads;
                    this.adsPage = ads.slice(0, 8);
                }
            );
        }
    }

    public handleOnPageChangeAction($event: { begin: number; end: number; }): void {
        if ($event) {
            this.adsPage = this.totalAds.slice($event.begin, $event.begin + $event.end);
        }
    }

    public handleAddAdAction(): void {
        this.dynamicDialogRef = this.customDialogService.open(
            NewAdFormComponent,
            {
                header: 'Cadastre de um novo anúncio',
                width: '50%',
                contentStyle: {
                    overflow: 'auto',
                },
                baseZIndex: 10000,
                maximizable: true,
            }
        );

        this.dynamicDialogRef.onClose
            .pipe(takeUntil(this.$destroy))
            .subscribe({
                next: () => {
                    console.log('close')
                    this.setAllAdsWithApi();
                }
            });
    }

    public ngOnDestroy(): void {
        this.$destroy.next();
        this.$destroy.complete();
    }

}
