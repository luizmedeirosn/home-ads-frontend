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
        setTimeout(() => {
            this.$loaded.next(true);
            this.messageService.clear();
            this.messageService.add({
                key: 'center',
                severity: 'success',
                summary: 'Sucesso',
                detail: 'Anúncios carregados com sucesso!',
                life: 2500,
            });
        }, 1500);

        this.setAllAdsWithApi(0, 8);
    }

    private setAllAdsWithApi(pageBeginElement: number, pageLastElement: number): void {
        this.adsService
            .findAllAds()
            .pipe(takeUntil(this.$destroy))
            .subscribe({
                next: (ads: AdDataMinDTO[]) => {
                    if (ads.length > 0) {
                        this.totalAds = ads;
                        this.adsPage = ads.slice(pageBeginElement, pageLastElement);
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
            this.adsService
                .findAllAds()
                .pipe(takeUntil(this.$destroy))
                .subscribe({
                    next: (ads: AdDataMinDTO[]) => {
                        if (ads.length > 0) {
                            this.totalAds = ads;
                            this.adsPage = ads.slice(0, 8);
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
                    if (this.adsService.changesOn) {
                        this.adsService.changesOn = false;
                        this.$loaded.next(false);
                        setTimeout(() => {
                            // gambiarra, o + 1 é devido a adição que nao é detectado pelo leght pq arequisição ainda n teve uma resposta, arrumar depois;
                            this.setAllAdsWithApi(this.totalAds.length - (this.totalAds.length % 8), this.totalAds.length + 1);

                            this.$loaded.next(true);
                        }, 1000);
                    }
                }
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
