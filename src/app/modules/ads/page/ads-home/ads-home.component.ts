import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { AdCategoryEnum } from 'src/app/models/enums/AdCategoriesEnum';
import { AdData } from 'src/app/models/interfaces/AdData';
import { AdsService } from 'src/app/services/ads/ads-service.service';
import { ReloadService } from 'src/app/services/reload/reload-service.service';

@Component({
  selector: 'app-ads-home',
  templateUrl: './ads-home.component.html',
  styleUrls: []
})
export class AdsHomeComponent implements OnInit {

    public $viewEnable: BehaviorSubject<boolean> = new BehaviorSubject(false);

    public totalAds!: Array<AdData>;
    public adsPage!: Array<AdData>;

    public constructor (
        private reloadService: ReloadService,
        private messageService: MessageService,

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

    public handleOnDropdownChangeAction($event: { category: AdCategoryEnum; }): void {
        if ($event) {
            this.adsService.findByCategory($event.category).then(
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
        console.log('handleAddAdAction invoked');
    }

}
