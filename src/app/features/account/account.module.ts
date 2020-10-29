import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AccountService } from './account.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    FormsModule
  ],
  exports: [],
  providers: [AccountService]
})
export class AccountModule { }
