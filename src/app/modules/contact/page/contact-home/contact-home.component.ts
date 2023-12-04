import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ReloadService } from 'src/app/services/reload/reload-service.service';

@Component({
    selector: 'app-contact-home',
    templateUrl: './contact-home.component.html',
    styleUrls: [],
})
export class ContactHomeComponent implements OnInit {
    public $viewEnable: BehaviorSubject<boolean> = new BehaviorSubject(false);

    public constructor(private reloadService: ReloadService) {}

    public ngOnInit(): void {
        if (this.reloadService.shouldReload()) {
            this.reloadService.setReloadFlag(false);
            window.location.reload();
        }
        window.addEventListener('load', () => {
            this.$viewEnable.next(true);
        });
    }
}