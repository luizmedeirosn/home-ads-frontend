import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import {
    IconDefinition,
    faPlus,
    faSearch,
    faTag,
    faX,
} from '@fortawesome/free-solid-svg-icons';
import { MessageService } from 'primeng/api';
import { Paginator, PaginatorState } from 'primeng/paginator';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { AdCategoryEnum } from 'src/app/models/enums/AdCategoriesEnum';
import { AdDataMinDTO } from 'src/app/models/interfaces/response/AdDataMinDTO';
import { AdsService } from 'src/app/services/ads/ads.service';

@Component({
    selector: 'app-ads-list',
    templateUrl: './ads-list.component.html',
    styleUrls: [],
})
export class AdsListComponent implements OnInit, OnDestroy {

    private $destroy: Subject<void> = new Subject();

    @Input() public totalAds!: Array<AdDataMinDTO>;
    @Input() public adsPage!: Array<AdDataMinDTO>;
    @Input() public keyWord!: string;
    @Input() public $loaded!: BehaviorSubject<boolean>;

    @Output() public $onInputChangeEvent: EventEmitter<{
        keyWord: string;
    }> = new EventEmitter();
    @Output() public $onDropdownChangeEvent: EventEmitter<{
        category: AdCategoryEnum | undefined;
    }> = new EventEmitter();
    @Output() public $onPageChangeEvent: EventEmitter<{
        begin: number;
        end: number;
    }> = new EventEmitter();
    @Output() public $addAdEvent: EventEmitter<void> = new EventEmitter();
    @Output() public $adViewDetailsEvent: EventEmitter<{ id: number }> = new EventEmitter();

    @ViewChild('paginator') paginator!: Paginator;

    public readonly faCategoryIcon: IconDefinition = faTag;
    public readonly faSearchIcon: IconDefinition = faSearch;
    public readonly faSearchAdsIcon: IconDefinition = faSearch;
    public readonly faNotFoundIcon: IconDefinition = faX;
    public readonly faAddIcon: IconDefinition = faPlus;

    public ratingDefaultValue: number = 0;

    public readonly categories = [
        { category: 'Cama, mesa e banho' },
        { category: 'Eletrodomésticos' },
        { category: 'Móveis' },
        { category: 'Ferramentas' },
    ];
    public selectedCategory!: { category: string };

    public constructor(
        private messageService: MessageService,
        private adsService: AdsService
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

            this.$onPageChangeEvent.emit({
                begin: 0,
                end: 9
            });

        }, 1500);

        this.adsService.$changesOn
            .pipe(takeUntil(this.$destroy))
            .subscribe({
                next: (changesOn: boolean) => {
                    if (changesOn) {
                        setTimeout(() => {
                            const length = this.totalAds.length + 1;
                            const numberPage = length % 9 > 0 ? Math.floor(length / 9) : Math.floor(length / 9) + 1;
                            this.paginator.changePage(numberPage);

                            this.$onPageChangeEvent.emit({
                                begin: this.totalAds.length - (this.totalAds.length % 9),
                                end: this.totalAds.length
                            })
                        }, 1600);
                    }
                },
                error: err => console.log(err)
            });
    }

    public handleDropdownChangeEvent(): void {
        if (this.selectedCategory) {
            const categoryMappings: { [key: string]: AdCategoryEnum } = {
                'Cama, mesa e banho': AdCategoryEnum.BED_AND_BATH,
                'Eletrodomésticos': AdCategoryEnum.APPLIANCES,
                'Móveis': AdCategoryEnum.FURNITURE,
                'Ferramentas': AdCategoryEnum.TOOLS,
            };
            const category: AdCategoryEnum =
                categoryMappings[this.selectedCategory.category];

            this.$onDropdownChangeEvent.emit({
                category,
            });
        } else {
            this.$onDropdownChangeEvent.emit({
                category: undefined,
            });
        }
    }

    public handleInputChangeEvent(): void {
        this.$onInputChangeEvent.emit({
            keyWord: this.keyWord
        });
    }

    public handleOnPageChangeEvent($event: PaginatorState): void {
        if ($event?.first !== undefined && $event?.rows !== undefined) {
            this.$onPageChangeEvent.emit({
                begin: $event.first,
                end: $event.rows,
            });
        }
    }

    public handleAdViewDetailsEvent(id: number) {
        this.$adViewDetailsEvent.emit({
            id
        });
    }

    public handleAddAdEvent(): void {
        this.$addAdEvent.emit();
    }

    ngOnDestroy(): void {
        this.$destroy.next();
        this.$destroy.complete();
    }

}
