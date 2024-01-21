import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { AdCategoryEnum } from 'src/app/models/enums/AdCategoriesEnum';
import { AdDataMinDTO } from 'src/app/models/interfaces/response/AdDataMinDTO';
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

    public totalAds!: Array<AdDataMinDTO>;
    public adsPage!: Array<AdDataMinDTO>;

    public dynamicDialogRef!: DynamicDialogRef;

    public constructor(
        private adsService: AdsService,
        private messageService: MessageService,
        private customDialogService: CustomDialogService,
        private router: Router,

    ) { }

    public ngOnInit(): void {
        this.setAdsWithApi();
    }

    private setAdsWithApi(): void {
        this.adsService
            .findAll()
            .pipe(takeUntil(this.$destroy))
            .subscribe({
                next: (ads: AdDataMinDTO[]) => {
                    if (ads.length > 0) {
                        this.totalAds = ads;
                    }
                },
                error: (err) => {
                    console.log(err);
                }
            });
    }

    public handleOnInputChangeAction($event: { keyWord: string }): void {
        if ($event) {
            this.adsService.findByKeyWord($event.keyWord).then(
                (ads) => {
                    this.totalAds = ads;
                    this.adsPage = ads.slice(0, 9);
                }
            );
        }
    }

    public handleOnDropdownChangeAction($event: { category: AdCategoryEnum | undefined; }): void {
        if ($event?.category) {
            this.adsService.findByCategory($event.category).then(
                (ads) => {
                    this.totalAds = ads;
                    this.adsPage = ads.slice(0, 9);
                }
            );
        } else {
            this.adsService
                .findAll()
                .pipe(takeUntil(this.$destroy))
                .subscribe({
                    next: (ads: AdDataMinDTO[]) => {
                        if (ads.length > 0) {
                            this.totalAds = ads;
                            this.adsPage = ads.slice(0, 9);
                            this.adsService.filterCategoryActivated = {
                                activated: false,
                                category: undefined
                            };
                        }
                    },
                    error: (err) => {
                        console.log(err);
                    }
                });
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
                width: '40rem',
                baseZIndex: 10000,
                maximizable: true,
            }
        );

        this.dynamicDialogRef.onClose
            .pipe(takeUntil(this.$destroy))
            .subscribe(() => {
                this.setAdsWithApi();

                this.$loaded.next(false);
                setTimeout(() => {
                    this.$loaded.next(true);
                }, 1500);
            });
    }

    public handleAdViewDetailsAction($event: { id: number; }) {
        if ($event) {
            this.adsService.findById($event.id)
                .pipe(takeUntil(this.$destroy))
                .subscribe({
                    next: (ad) => {
                        this.adsService.selectedAd = ad;
                        this.messageService.clear();
                        this.router.navigate(['ads/view']);
                    },
                    error: (err) => {
                        this.messageService.clear();
                        this.messageService.add({
                            key: 'login',
                            severity: 'warn',
                            summary: 'Aviso',
                            detail: 'Sua sesção expirou, realize um novo login!',
                            life: 3000
                        });
                        console.log(err);
                    }
                });
        }
    }

    public ngOnDestroy(): void {
        this.$destroy.next();
        this.$destroy.complete();
    }

}
