import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FilterService } from 'primeng/api';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { AdCategoryEnum } from 'src/app/models/enums/AdCategoriesEnum';
import { PostAdDTO } from 'src/app/models/interfaces/request/PostAdDTO';
import { AdDataMinDTO } from 'src/app/models/interfaces/response/AdDataMinDTO';
import { environment } from 'src/environments/environment';
import { AdDataFullDTO } from '../../models/interfaces/response/AdDataFullDTO';

@Injectable({
    providedIn: 'root',
})
export class AdsService implements OnDestroy {

    private readonly $destroy: Subject<void> = new Subject();

    private API_URL: string = environment.API_URL;

    public filterCategoryActivated!: { activated: boolean; category: AdCategoryEnum | undefined };

    public ads!: Array<AdDataMinDTO>;
    public selectedAd!: AdDataFullDTO;

    public $changesOn: BehaviorSubject<boolean> = new BehaviorSubject(false);

    public constructor(
        private primeFilterService: FilterService,
        private cookieService: CookieService,
        private httpClient: HttpClient,
    ) {
        this.httpClient.get<Array<AdDataMinDTO>>(
            `${this.API_URL}/api/ads`,
        ).pipe(takeUntil(this.$destroy))
            .subscribe((ads) => this.ads = ads);
    }

    public findAll(): Observable<Array<AdDataMinDTO>> {
        return this.httpClient.get<Array<AdDataMinDTO>>(
            `${this.API_URL}/api/ads`,
        );
    }

    public findAdsPerPage(begin: number, end: number): Promise<Array<AdDataMinDTO>> {
        return Promise.resolve(this.ads.slice(begin, begin + end));
    }

    public async findByKeyWord(keyWord: string): Promise<Array<AdDataMinDTO>> {
        let ads: Array<AdDataMinDTO> = new Array();
        if (this.filterCategoryActivated?.activated && this.filterCategoryActivated?.category) {
            await this.findByCategory(this.filterCategoryActivated.category).then(
                (filteredAds) => {
                    ads = filteredAds;
                }
            );
        } else {
            ads = this.ads;
        }
        const filteredAds: Array<AdDataMinDTO> = ads.filter((x) =>
            this.primeFilterService.filters['contains'](
                x.title.toLowerCase().split(" ").map(x => x.trim()).reduce((a, b) => a + b, ""),
                keyWord.toLowerCase().split(" ").map(x => x.trim()).reduce((a, b) => a + b, "")
            ),
        );

        return Promise.resolve(filteredAds);
    }

    public findByCategory(category: AdCategoryEnum): Promise<Array<AdDataMinDTO>> {
        const filteredAds: Array<AdDataMinDTO> = this.ads.filter((x) =>
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

    public findById(id: number): Observable<AdDataFullDTO> {
        const httpsOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.cookieService.get('JWT_TOKEN')}`
            })
        };
        return this.httpClient.get<AdDataFullDTO>(
            `${this.API_URL}/api/ads/${id}`,
            httpsOptions
        );
    }

    public save(adRequest: PostAdDTO): Observable<AdDataFullDTO> {
        const httpsOptions = {
            headers: new HttpHeaders({
                'Authorization': `Bearer ${this.cookieService.get('JWT_TOKEN')}`
            })
        };

        const formData = new FormData();
        formData.append('title', adRequest.title);
        formData.append('comment', adRequest.comment);
        formData.append('averagePrice', String(adRequest.averagePrice));
        formData.append('rating', String(adRequest.rating));
        formData.append('categoryCode', String(adRequest.categoryCode));
        formData.append('publicationDate', String(adRequest.publicationDate));
        formData.append('image', adRequest.image);
        formData.append('userId', String(adRequest.userId));


        return this.httpClient.post<AdDataFullDTO>(
            `${this.API_URL}/api/ads`,
            formData,
            httpsOptions
        );
    }

    public ngOnDestroy(): void {
        this.$destroy.next();
        this.$destroy.complete();
    }

}
