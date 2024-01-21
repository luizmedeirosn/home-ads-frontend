import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
    IconDefinition,
    faPlus,
    faSearch,
    faTag,
    faX,
} from '@fortawesome/free-solid-svg-icons';
import { PaginatorState } from 'primeng/paginator';
import { AdCategoryEnum } from 'src/app/models/enums/AdCategoriesEnum';
import { AdDataMinDTO } from 'src/app/models/interfaces/response/AdDataMinDTO';

@Component({
    selector: 'app-ads-list',
    templateUrl: './ads-list.component.html',
    styleUrls: [],
})
export class AdsListComponent implements OnInit {

    @Input() public totalAds!: Array<AdDataMinDTO>;
    @Input() public adsPage!: Array<AdDataMinDTO>;
    @Input() public keyWord!: string;

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

    public ngOnInit(): void {
        this.$onPageChangeEvent.emit({
            begin: 0,
            end: 9
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
}
