import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from 'primeng/api';
import { from, Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { AuthUserModel } from '../authorization/authentication-response.model';
import { AuthorizationService } from '../authorization/authorization.service';
import { Constants } from '../Constants';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

    constructor(
        private readonly messageService: MessageService,
        private readonly cookieService: CookieService,
        private readonly router: Router,
        private readonly authorizationService: AuthorizationService) { }

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

                        return this.handle(request, next);
                    }));
            } else {
                request = request.clone({
                    headers: request.headers.set("Authorization", "Bearer " + authUserData.jwt.accessToken)
                });

                return this.handle(request, next);
            }
        } else {
            return this.handle(request, next);
        }
    }

    private handle(request: HttpRequest<any>, next: HttpHandler) {
        return next.handle(request)
            .pipe(catchError(error => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status == 400) {
                        this.messageService.add({ severity: 'error', detail: error.error.errorCode })
                    }
                    else if (error.status == 401) {
                        this.cookieService.delete(Constants.KEY_AUTH_USER, "/");
                        this.router.navigate(['account', 'login']);
                    }
                    else if (error.status == 403) {
                        this.messageService.add({ severity: 'error', detail: 'Not authorized' })
                    }
                    else {
                        this.messageService.add({ severity: 'error', detail: 'Something went wrong' })
                    }
                }
                return throwError(error);
            }));
    }
}