import { Component, Input } from '@angular/core';
import { AdDataMin } from 'src/app/models/interfaces/AdDataMin';
import { IconDefinition, faTag, faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-ads-carousel',
  templateUrl: './ads-carousel.component.html',
  styleUrls: [],
})
export class AdsCarouselComponent {

    @Input() ads!: Array<AdDataMin>;

    public ratingDefaultValue: number = 0

    public readonly faCategoryIcon: IconDefinition = faTag;
    public readonly faSearchIcon: IconDefinition = faSearch;

    public responsiveOptions = [
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '991px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '767px',
            numVisible: 1,
            numScroll: 1
        }
    ];

}
