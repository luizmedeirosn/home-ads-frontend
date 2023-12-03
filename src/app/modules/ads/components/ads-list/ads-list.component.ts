import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IconDefinition, faSearch, faTag } from '@fortawesome/free-solid-svg-icons';
import { PaginatorState } from 'primeng/paginator';
import { AdData } from 'src/app/models/interfaces/AdData';

@Component({
  selector: 'app-ads-list',
  templateUrl: './ads-list.component.html',
  styleUrls: []
})
export class AdsListComponent implements OnInit{

    @Input() ads!: Array<AdData>;

    @Output() $onPageChangeEvent: EventEmitter<{ begin: number; end: number }> = new EventEmitter();

    public ratingDefaultValue: number = 0;

    public readonly faCategoryIcon: IconDefinition = faTag;
    public readonly faSearchIcon: IconDefinition = faSearch;

    public ngOnInit(): void {
        this.$onPageChangeEvent.emit({
            begin: 0,
            end: 8
        });
    }

    public onPageChange($event: PaginatorState) {
        if ($event?.first !== undefined && $event?.rows !== undefined ) {
            this.$onPageChangeEvent.emit({
                begin: $event.first,
                end: $event.rows
            });
        }
    }

}
