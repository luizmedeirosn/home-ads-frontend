import { Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user/user.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService {

    constructor(
        private userService: UserService,
        private router: Router
    ) {
    }

    public canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!this.userService.isLoggedIn()) {
            this.router.navigate(['/home'])
            return false;
        } else {
            return true;
        }
    }

}
