import { UserService } from './../../../../services/user/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
    IconDefinition,
    faBars,
    faBullhorn,
    faInbox,
    faRightFromBracket,
    faRightToBracket,
    faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-sidebar-navigation',
    templateUrl: './sidebar-navigation.component.html',
    styleUrls: [],
})
export class SidebarNavigationComponent implements OnInit {

    public readonly faSiginIcon: IconDefinition = faRightToBracket;
    public readonly faSigupIcon: IconDefinition = faUserPlus;
    public readonly faSideBarIcon: IconDefinition = faBars;
    public readonly faAdsIcon: IconDefinition = faBullhorn;
    public readonly faContactIcon: IconDefinition = faInbox;
    public readonly faLogoutIcon: IconDefinition = faRightFromBracket;

    public sidebarVisible: boolean = false;

    public $isLoggedIn!: Subject<boolean>;

    public constructor(
        private router: Router,
        private userService: UserService
    ) { }

    public ngOnInit(): void {
        this.$isLoggedIn.next(this.userService.isLoggedIn());
    }

}
