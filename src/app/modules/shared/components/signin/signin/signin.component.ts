import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { SigninDTO } from 'src/app/models/interfaces/request/SigninDTO';
import { UserService } from 'src/app/services/user/user.service';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: []
})
export class SigninComponent {

    private destroy$: Subject<void> = new Subject<void>();

    public loginForm: FormGroup = this.formBuilder.group({
        email: ['', Validators.required, Validators.email],
        password: ['', Validators.required, Validators.minLength(3)]
    });

    public constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private cookieSerivce: CookieService,
        private messageService: MessageService,
        private router: Router
    ) {
    }

    public onSubmitLoginForm(): void {
        if (this.loginForm.value && this.loginForm.valid) {
            this.userService.signin(this.loginForm.value as SigninDTO)
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: (tokenDTO) => {
                        if (tokenDTO) {
                            this.cookieSerivce.set('JWT_TOKEN', tokenDTO.JWT_TOKEN);
                            this.loginForm.reset();
                            this.router.navigate(['/ads']);
                        }
                    },
                    error: (err) => {
                        this.messageService.clear();
                        this.messageService.add({
                            key: 'center',
                            severity: 'error',
                            summary: 'Erro',
                            detail: 'Informe um login válido ou cadastre-se!',
                            life: 3000
                        })
                        console.log(err);
                    }
                });
        }
    }

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

}
