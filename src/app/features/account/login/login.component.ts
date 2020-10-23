import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { AccountService } from '../../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User = {};

  constructor(
    private readonly accountService: AccountService,
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
    this.accountService.login(this.user).subscribe(
      response => {

      }
    )
  }
}
