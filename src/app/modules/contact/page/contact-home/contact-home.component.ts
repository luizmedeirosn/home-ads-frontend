import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-contact-home',
    templateUrl: './contact-home.component.html',
    styleUrls: [],
})
export class ContactHomeComponent implements OnInit {
    public $loaded: BehaviorSubject<boolean> = new BehaviorSubject(false);

    public ngOnInit(): void {
        setTimeout(() => this.$loaded.next(true), 1500);
    }
}
