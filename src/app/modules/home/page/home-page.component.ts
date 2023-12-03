import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AdData } from 'src/app/models/interfaces/AdData';
import { AdsService } from 'src/app/services/ads/ads-service.service';
import { ReloadService } from 'src/app/services/reload/reload-service.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: [],
})
export class HomePageComponent implements OnInit {
    public $viewEnable: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public ads!: Array<AdData>;

    constructor(
        private reloadService: ReloadService,
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
        this.adsService.findAllAds().then((ads) => {
            if (ads.length > 0) {
                this.ads = ads;
            }
        });
    }
}
