import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AccountRoutingModule } from './account-routing.module';
import { BgsSharedModule } from 'src/app/shared/bgs-shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AccountRoutingModule,
    BgsSharedModule,
    FormsModule
  ]
})
export class AccountModule { }
