import { AdDataRequest } from 'src/app/models/interfaces/request/AdDataRequest';
import { AdDataFullResponse } from '../../models/interfaces/response/AdDataFullResponse';
import { Injectable, OnDestroy } from '@angular/core';
import { FilterService } from 'primeng/api';
import { AdCategoryEnum } from 'src/app/models/enums/AdCategoriesEnum';
import { AdDataMinResponse } from 'src/app/models/interfaces/response/AdDataMinResponse';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, takeUntil } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AdsService implements OnDestroy {

    private readonly $destroy: Subject<void> = new Subject();

    private API_URL: string = environment.API_URL;
    private JWT_TOKEN: string = this.cookieService.get('JWT_TOKEN');
    private httpsOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.JWT_TOKEN}`
        })
    }

    public ads!: Array<AdDataMinResponse>;

    public filterCategoryActivated!: { activated: boolean; category: AdCategoryEnum | undefined };

    public constructor(
        private primeFilterService: FilterService,
        private cookieService: CookieService,
        private httpClient: HttpClient,
    ) { }

    public findAllAds(): Promise<Array<AdDataMinResponse>> {
        return new Promise((resolve, reject) => {
            this.httpClient.get<Array<AdDataMinResponse>>(
                `${this.API_URL}/api/ads`,
                this.httpsOptions
            )
                .pipe(takeUntil(this.$destroy))
                .subscribe({
                    next: (ads) => {
                        this.ads = ads;
                        resolve(this.ads);
                    },
                    error: (err) => {
                        console.log(err);
                        reject(err);
                    }
                });
        });
    }

    public findAdsPerPage(begin: number, end: number): Promise<Array<AdDataMinResponse>> {
        return Promise.resolve(this.ads.slice(begin, begin + end));
    }

    public async findByKeyWord(keyWord: string): Promise<Array<AdDataMinResponse>> {
        let ads: Array<AdDataMinResponse> = new Array();
        if (this.filterCategoryActivated?.activated && this.filterCategoryActivated?.category) {
            await this.findByCategory(this.filterCategoryActivated.category).then(
                (filteredAds) => {
                    ads = filteredAds;
                }
            );
        } else {
            ads = this.ads;
        }
        const filteredAds: Array<AdDataMinResponse> = ads.filter((x) =>
            this.primeFilterService.filters['contains'](
                x.title.toLowerCase().split(" ").map(x => x.trim()).reduce((a, b) => a + b, ""),
                keyWord.toLowerCase().split(" ").map(x => x.trim()).reduce((a, b) => a + b, "")
            ),
        );

        return Promise.resolve(filteredAds);
    }

    public findByCategory(category: AdCategoryEnum): Promise<Array<AdDataMinResponse>> {
        const filteredAds: Array<AdDataMinResponse> = this.ads.filter((x) =>
            this.primeFilterService.filters['contains'](x.category, category)
        );

        if (filteredAds.length > 0) {
            this.filterCategoryActivated = {
                activated: true,
                category
            };
            return Promise.resolve(filteredAds);
        } else {
            this.filterCategoryActivated = {
                activated: false,
                category: undefined
            };
            return Promise.resolve(this.ads);
        }
    }

    public save(adRequest: AdDataRequest): Promise<AdDataFullResponse> {
        const ad: AdDataFullResponse = {
            title: adRequest.title,
            comment: adRequest.comment,
            image: adRequest.image,
            averagePrice: adRequest.averagePrice,
            rating: adRequest.rating,
            category: adRequest.category,
            userName: adRequest.userName,
            publicationDate: adRequest.publicationDate,
        }

        return Promise.resolve(ad);
    }

    public ngOnDestroy(): void {
        this.$destroy.next();
        this.$destroy.complete();
    }
}
