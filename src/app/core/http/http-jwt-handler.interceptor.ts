import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AppConfigurationService } from '../app-configuration/app-configuration.service';
import { AuthUserModel } from '../authorization/authentication-response.model';
import { AuthorizationService } from '../authorization/authorization.service';
import { Constants } from '../Constants';

@Injectable()
export class HttpJwtHandlerInterceptor implements HttpInterceptor {

    constructor(
        private readonly messageService: MessageService,
        private readonly cookieService: CookieService,
        private readonly router: Router,
        private readonly authorizationService: AuthorizationService,
        private readonly appConfigService: AppConfigurationService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authUserCookie = this.cookieService.get(Constants.KEY_AUTH_USER);

        if (authUserCookie) {
            const authUserData = <AuthUserModel>JSON.parse(authUserCookie);

            if (new Date(authUserData.jwt.expiresOnClient) <= new Date() && request.url.indexOf('refreshToken') < 0) {
                return this.authorizationService.refreshToken().pipe(mergeMap(
                    accessToken => {
                        request = request.clone({
                            headers: request.headers.set("Authorization", "Bearer " + accessToken)
                        });

                        return next.handle(request);
                    }));
            } else {
                request = request.clone({
                    headers: request.headers.set("Authorization", "Bearer " + authUserData.jwt.accessToken)
                });

                return next.handle(request);
            }
        } else {
            return next.handle(request);
        }
    }
}