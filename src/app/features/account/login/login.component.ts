import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { AuthorizationService } from 'src/app/core/authorization/authorization.service';
import { AuthenticateUserModel } from 'src/app/models/authenticate-user.model';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: AuthenticateUserModel = {};

  constructor(
    private readonly authorizationService: AuthorizationService,
    private readonly messageService: MessageService) { }

  ngOnInit(): void {
  }

  loginClick() {
    if (!this.user.email || !this.user.password) {
      this.messageService.add({ severity: 'error', detail: 'Enter all fields', summary: "Error" });
      return;
    }
    this.login();

  }
  private login() {
    this.authorizationService.login(this.user).subscribe(
      response => {

      }
    )
  }
}
