import { Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../services/user/user.service';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService {

    constructor(
        private userService: UserService,
        private router: Router,
        private messageService: MessageService
    ) {
    }

    public canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (!this.userService.isLoggedIn()) {
            this.router.navigate(['/home'])
            this.messageService.clear();
            this.messageService.add({
                key: 'login',
                severity: 'warn',
                summary: 'Aviso',
                detail: 'Realize o login para continuar!',
                life: 3000
            });
            return false;
        } else {
            return true;
        }
    }

}
