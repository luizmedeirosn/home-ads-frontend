import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { AdDataMinDTO } from 'src/app/models/interfaces/response/AdDataMinDTO';
import { AdsService } from 'src/app/services/ads/ads.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: [],
})
export class HomePageComponent implements OnInit {

    private readonly $destroy: Subject<void> = new Subject();
    public $loaded: BehaviorSubject<boolean> = new BehaviorSubject(false);

    public ads!: Array<AdDataMinDTO>;

    constructor(
        private adsService: AdsService
    ) { }

    public ngOnInit(): void {
        setTimeout(() => this.$loaded.next(true), 1500);
        this.adsService
            .findAll()
            .pipe(takeUntil(this.$destroy))
            .subscribe((ads) => {
                if (ads.length > 0) {
                    this.ads = ads;
                }
            });
    }

}
