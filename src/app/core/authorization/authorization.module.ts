import { NgModule } from '@angular/core';
import { AuthorizationGuard, LoginAuthGuard } from './auth.guard';
import { AuthorizationService } from './authorization.service';

@NgModule({
  declarations: [],
  providers: [
    AuthorizationService,
    AuthorizationGuard,
    LoginAuthGuard
  ]
})
export class AuthorizationModule { }