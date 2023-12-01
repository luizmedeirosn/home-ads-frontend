import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
    IconDefinition,
    faBars,
    faBullhorn,
    faEnvelope,
    faRightFromBracket,
    faRightToBracket,
    faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { ReloadService } from 'src/app/services/reload/reload-service.service';

@Component({
    selector: 'app-sidebar-navigation',
    templateUrl: './sidebar-navigation.component.html',
    styleUrls: [],
})
export class SidebarNavigationComponent {
    public readonly faSiginIcon: IconDefinition = faRightToBracket;
    public readonly faSigupIcon: IconDefinition = faUserPlus;
    public readonly faSideBarIcon: IconDefinition = faBars;
    public readonly faAdsIcon: IconDefinition = faBullhorn;
    public readonly faContactIcon: IconDefinition = faEnvelope;
    public readonly faLogoutIcon: IconDefinition = faRightFromBracket;

    public sidebarVisible: boolean = false;

    public constructor(
        private router: Router,
        private reloadService: ReloadService
    ) {}

    public goToRouteAndReload(route: string): void {
        this.router.navigate([route]);
        this.reloadService.setReloadFlag(true);
    }
}
