import { Component, OnInit } from '@angular/core';
import { AdData } from 'src/app/models/interfaces/AdData';
import { AdsService } from 'src/app/services/ads/ads-service.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: []
})
export class HomePageComponent implements OnInit {

    public ads!: Array<AdData>;

    constructor (
        private adsService: AdsService
    ) {
    }

    public ngOnInit(): void {
        this.adsService.findAllProducts().then(
            (ads) => {
                if(ads.length > 0) {
                    this.ads = ads;
                }
            }
        );
    }

}
