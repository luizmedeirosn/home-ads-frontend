import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-about-us-home',
    templateUrl: './about-us-home.component.html',
    styleUrls: [],
})
export class AboutUsHomeComponent implements OnInit {
    public $loaded: BehaviorSubject<boolean> = new BehaviorSubject(false);

    public ngOnInit(): void {
        setTimeout(() => this.$loaded.next(true), 1500);
    }
}
