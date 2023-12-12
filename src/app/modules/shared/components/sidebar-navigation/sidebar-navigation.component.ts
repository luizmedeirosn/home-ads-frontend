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
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { CustomDialogService } from 'src/app/modules/shared/services/dialog/custom-dialog.service';
import { SigninComponent } from '../signin/signin.component';
import { UserService } from './../../../../services/user/user.service';

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

        this.dynamicDialogRef.onClose
            .pipe(takeUntil(this.$destroy))
            .subscribe({
                next: () => {
                    if (this.userService.isLoggedIn()) {
                        this.$isLoggedIn.next(true);
                    }
                }
            });
    }

    public ngOnDestroy(): void {
        this.$destroy.next();
        this.$destroy.complete();
    }
}
