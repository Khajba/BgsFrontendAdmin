import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthorizationService } from './authorization.service';

@Injectable()
export class AuthorizationGuard implements CanActivate {

    constructor(private authorizationService: AuthorizationService, private router: Router) { }

    async canActivate() {
        if (!this.authorizationService.isAuthenticated.value) {
            this.router.navigate(['account', 'login']);

            return false;
        }

        return true;
    }
}

@Injectable()
export class LoginAuthGuard implements CanActivate {

    constructor(
        private readonly router: Router,
        private readonly authorizationService: AuthorizationService) { }

    canActivate() {
        if (this.authorizationService.isAuthenticated.value) {
            this.router.navigate(['/']);

            return false;
        }

        return true;
    }
}