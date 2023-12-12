import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { SignupDTO } from 'src/app/models/interfaces/request/SignupDTO';
import { SigninDTO } from 'src/app/models/interfaces/request/SigninDTO';
import { TokenDto } from 'src/app/models/interfaces/response/TokenDTO';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    private API_URL = environment.API_URL;

    public constructor(private httpClient: HttpClient, private cookieService: CookieService) {
    }

    public signup(signupDTO: SignupDTO): Observable<TokenDto> {
        return this.httpClient.post<TokenDto>(
            `${this.API_URL}/auth/signup`,
            signupDTO
        );
    }

    public signin(signin: SigninDTO): Observable<TokenDto> {
        return this.httpClient.post<TokenDto>(
            `${this.API_URL}/auth`,
            signin
        )
    }

    public isLoggedIn(): boolean {
        const JWT_TOKEN = this.cookieService.get('JWT_TOKEN');
        return !!JWT_TOKEN;
    }

}
