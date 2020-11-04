import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BgsSharedModule } from './shared/bgs-shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { AuthorizationModule } from './core/authorization/authorization.module';
import { HttpJwtHandlerInterceptor } from './core/http/http-jwt-handler.interceptor';
import { AppConfigurationService } from './core/app-configuration/app-configuration.service';
import { HttpErrorHandlerInterceptor } from './core/http/http-error-handler.interceptor';
import { HttpHeadersInterceptor } from './core/http/http-language-header.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BgsSharedModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AuthorizationModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (settings: AppConfigurationService) => async () => await settings.init(),
      deps: [AppConfigurationService],
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorHandlerInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpJwtHandlerInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpHeadersInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }