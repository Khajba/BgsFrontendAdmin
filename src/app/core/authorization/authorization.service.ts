import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { AuthenticateUserModel } from 'src/app/models/authenticate-user.model';
import { Constants } from '../Constants';
import { HttpService } from '../http/http.service';
import { AuthUserModel } from './authentication-response.model';

const apiBaseUrl = "http://localhost:64764/api/account";

@Injectable()
export class AuthorizationService {

  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.cookieService.get(Constants.KEY_AUTH_USER) !== "");

  get authUserData(): AuthUserModel {
    const authUserCookie = this.cookieService.get(Constants.KEY_AUTH_USER);

    if (authUserCookie === "") {
      window.location.reload();

      return <any>{};
    }

    return JSON.parse(authUserCookie);
  }

  constructor(
    private readonly httpService: HttpService,
    private readonly cookieService: CookieService,
    private readonly router: Router) { }

  login(user: AuthenticateUserModel) {
    return this.httpService.get<AuthUserModel>(`${apiBaseUrl}/login`, user)
      .pipe(map(response => {
        this.cookieService.set(
          Constants.KEY_AUTH_USER,
          JSON.stringify(response),
          new Date(response.jwt.expires),
          "/"
        );

        this.isAuthenticated.next(true);

        this.router.navigate(['/']);
      }));
  }

  logout() {
    this.cookieService.delete(Constants.KEY_AUTH_USER, "/");
  }
}