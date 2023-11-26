import { Component } from '@angular/core';
import { IconDefinition, faRightToBracket, faUserPlus, faBars, faBullhorn, faPhoneVolume, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-sidebar-navigation',
    templateUrl: './sidebar-navigation.component.html',
    styleUrls: []
})
export class SidebarNavigationComponent {

    public readonly faSiginIcon: IconDefinition = faRightToBracket;
    public readonly faSigupIcon: IconDefinition = faUserPlus;
    public readonly faSideBarIcon: IconDefinition = faBars;
    public readonly faAdsIcon: IconDefinition = faBullhorn;
    public readonly faContactIcon: IconDefinition = faPhoneVolume;
    public readonly faLogoutIcon: IconDefinition = faRightFromBracket;

    public sidebarVisible: boolean = false;

}
