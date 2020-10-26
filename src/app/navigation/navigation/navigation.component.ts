import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from 'src/app/core/authorization/authorization.service';
import { AuthenticateUserModel } from 'src/app/models/authenticate-user.model';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  get email() {
    return this.authorizationService.authUserData.email;
  }

  constructor(private readonly authorizationService: AuthorizationService) { }

  logout() {
    this.authorizationService.logout();

    window.location.reload();
  }
}