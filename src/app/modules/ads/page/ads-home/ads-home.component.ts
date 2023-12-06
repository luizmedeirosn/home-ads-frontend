import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { AdCategoryEnum } from 'src/app/models/enums/AdCategoriesEnum';
import { AdDataMin } from 'src/app/models/interfaces/AdDataMin';
import { AdsService } from 'src/app/services/ads/ads-service.service';
import { ReloadService } from 'src/app/services/reload/reload-service.service';
import { NewAdFormComponent } from '../../components/new-ad-form/new-ad-form.component';

@Component({
  selector: 'app-ads-home',
  templateUrl: './ads-home.component.html',
  styleUrls: []
})
export class AdsHomeComponent implements OnInit, OnDestroy {

    private $destroy: Subject<void> = new Subject();

    public $viewEnable: BehaviorSubject<boolean> = new BehaviorSubject(false);

    public totalAds!: Array<AdDataMin>;
    public adsPage!: Array<AdDataMin>;

    private dynamicDialogRef!: DynamicDialogRef;

    public constructor (
        private reloadService: ReloadService,
        private messageService: MessageService,
        private dialogService: DialogService,

        private adsService: AdsService
    ) {}

    public ngOnInit(): void {
        if (this.reloadService.shouldReload()) {
            this.reloadService.setReloadFlag(false);
            window.location.reload();
        }
        window.addEventListener('load', () => {
            this.$viewEnable.next(true);
        });
        this.adsService.findAllAds().then(
            (ads) => {
                if (ads.length > 0) {
                    this.totalAds = ads;
                    this.adsPage = ads.slice(0, 8);
                    this.messageService.clear();
                    this.messageService.add({
                        key: 'adsToast',
                        severity: 'success',
                        summary: 'Sucesso',
                        detail: 'Anúncios carregados com sucesso!',
                        life: 2500,
                    });
                }
            }
        );
    }

    public handleOnInputChangeAction( $event: {keyWord: string} ): void {
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

    public handleAddAdAction() : void {
        this.dynamicDialogRef = this.dialogService.open(
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
                console.log('onClose()')
            }
        });
    }

    public ngOnDestroy(): void {
        this.$destroy.next();
        this.$destroy.complete();
    }

}
