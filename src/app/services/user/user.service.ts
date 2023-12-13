import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { SignupDTO } from 'src/app/models/interfaces/request/SignupDTO';
import { SigninDTO } from 'src/app/models/interfaces/request/SigninDTO';
import { LoginDTO } from 'src/app/models/interfaces/response/LoginDTO';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private readonly API_URL = environment.API_URL;

    public constructor(private httpClient: HttpClient, private cookieService: CookieService) {
    }

    public signup(signupDTO: SignupDTO): Observable<LoginDTO> {
        return this.httpClient.post<LoginDTO>(
            `${this.API_URL}/auth/signup`,
            signupDTO
        );
    }

    public signin(signin: SigninDTO): Observable<LoginDTO> {
        return this.httpClient.post<LoginDTO>(
            `${this.API_URL}/auth/signin`,
            signin
        )
    }

    public getUserId(): string {
        return this.cookieService.get('USER_ID');
    }

    public getUserRole(): string {
        return this.cookieService.get('USER_ROLE');
    }

    public isLoggedIn(): boolean {
        const JWT_TOKEN = this.cookieService.get('JWT_TOKEN');
        return !!JWT_TOKEN;
    }

}
