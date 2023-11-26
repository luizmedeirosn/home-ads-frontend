import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: []
})
export class AppComponent {

    public title = 'home-ads';

    constructor(private primengConfig: PrimeNGConfig) {
    }

    public ngOnInit() {
        this.primengConfig.ripple = true;
    }

}
