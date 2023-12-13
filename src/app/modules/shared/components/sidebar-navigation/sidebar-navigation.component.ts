import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { CookieService } from 'ngx-cookie-service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject, Subject } from 'rxjs';
import { CustomDialogService } from 'src/app/modules/shared/services/dialog/custom-dialog.service';
import { SigninComponent } from '../signin/signin.component';
import { UserService } from './../../../../services/user/user.service';
import { SignupComponent } from '../signup/signup.component';

@Component({
    selector: 'app-sidebar-navigation',
    templateUrl: './sidebar-navigation.component.html',
    styleUrls: [],
})
export class SidebarNavigationComponent implements OnInit, OnDestroy {
    private $destroy: Subject<void> = new Subject();

    public readonly faSiginIcon: IconDefinition = faRightToBracket;
    public readonly faSigupIcon: IconDefinition = faUserPlus;
    public readonly faSideBarIcon: IconDefinition = faBars;
    public readonly faAdsIcon: IconDefinition = faBullhorn;
    public readonly faContactIcon: IconDefinition = faInbox;
    public readonly faLogoutIcon: IconDefinition = faRightFromBracket;

    public sidebarVisible: boolean = false;

    public $isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);

    private dynamicDialogRef!: DynamicDialogRef;

    public constructor(
        private router: Router,
        private userService: UserService,
        private customDialogService: CustomDialogService,
        private cookieService: CookieService
    ) { }

    public ngOnInit(): void {
        this.$isLoggedIn.next(this.userService.isLoggedIn());
    }


    public handleSigninEvent() {
        this.dynamicDialogRef = this.customDialogService.open(
            SigninComponent,
            {
                position: 'top',
                header: 'Login',
                width: '40%',
                style: {
                    'margin-top': '36px',
                },
                contentStyle: {
                    overflow: 'auto',
                },
                baseZIndex: 10000,
            }
        );
    }

    public handleSignupEvent(): void {
        this.dynamicDialogRef = this.customDialogService.open(
            SignupComponent,
            {
                position: 'top',
                header: 'Criar uma conta',
                width: '40%',
                style: {
                    'margin-top': '36px',
                },
                contentStyle: {
                    overflow: 'auto',
                },
                baseZIndex: 10000,
            }
        );
    }

    public handleLogoutEvent(): void {
        this.cookieService.delete('JWT_TOKEN');
        this.router.navigate(['/home']);
    }

    public ngOnDestroy(): void {
        this.$destroy.next();
        this.$destroy.complete();
    }
}
