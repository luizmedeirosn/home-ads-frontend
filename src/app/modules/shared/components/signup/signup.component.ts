import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { SignupDTO } from 'src/app/models/interfaces/request/SignupDTO';
import { UserService } from 'src/app/services/user/user.service';
import { CustomDialogService } from '../../services/dialog/custom-dialog.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: []
})
export class SignupComponent {

    private destroy$: Subject<void> = new Subject<void>();

    public signupForm: FormGroup = this.formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
        email: ['', [Validators.required, Validators.email, Validators.minLength(11), Validators.maxLength(50)]],
        password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    });

    public constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private cookieSerivce: CookieService,
        private messageService: MessageService,
        private router: Router,
        private customDialogService: CustomDialogService,
    ) {
    }

    public handleSubmitSignupForm(): void {
        if (this.signupForm.value && this.signupForm.valid) {
            this.userService.signup(this.signupForm.value as SignupDTO)
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: (loginDTO) => {
                        if (loginDTO) {
                            console.log(loginDTO)
                            this.userService.loginInfo = loginDTO;
                            this.cookieSerivce.delete('JWT_TOKEN');
                            this.cookieSerivce.set('JWT_TOKEN', loginDTO.JWT_TOKEN);
                            this.signupForm.reset();
                            this.router.navigate(['/ads']);
                            this.customDialogService.close();
                        }
                    },
                    error: (err) => {
                        this.messageService.clear();
                        this.messageService.add({
                            key: 'login',
                            severity: 'error',
                            summary: 'Erro',
                            detail: 'Credenciais inválidas!',
                            life: 3000
                        });
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
