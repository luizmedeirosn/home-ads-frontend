import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IconDefinition, faTag } from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { AdDataFullResponse } from 'src/app/models/interfaces/response/AdDataFullResponse';
import { AdsService } from 'src/app/services/ads/ads.service';

@Component({
    selector: 'app-ad-view',
    templateUrl: './ad-view.component.html',
    styleUrls: []
})
export class AdViewComponent {

    public $loaded: BehaviorSubject<boolean> = new BehaviorSubject(false);
    public selectedAd!: AdDataFullResponse;
    public ratingDefaultValue: number = 0;
    public readonly faCategoryIcon: IconDefinition = faTag;


    public constructor(
        private adsService: AdsService,
        private router: Router,
        private messageService: MessageService,
    ) {
    }

    public ngOnInit(): void {
        if (this.adsService.selectedAd) {
            this.selectedAd = this.adsService.selectedAd;
            setTimeout(() => {
                this.$loaded.next(true);
                this.messageService.clear();
                this.messageService.add({
                    key: 'ads',
                    severity: 'success',
                    summary: 'Sucesso',
                    detail: 'Busca realizada com sucesso!',
                    life: 3000
                });
            }, 1000);
        } else {
            this.router.navigate(['/ads']);
        }
    }

}
