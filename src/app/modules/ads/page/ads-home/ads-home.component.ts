import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
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

    public ads!: Array<AdData>;

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
        this.messageService.clear();
        this.messageService.add({
            key: 'adsToast',
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Anúncios carregados com sucesso!',
            life: 2500,
        });
    }

    public onPageChangeAction($event: { begin: number; end: number; }) {
        this.adsService.findProducsPerPage($event.begin, $event.end).then(
            (ads) => {
                if (ads.length > 0) {
                    this.ads = ads;
                }
            }
        );
    }

}
