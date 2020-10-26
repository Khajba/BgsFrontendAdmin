import { Injectable } from "@angular/core";
import { AuthUserModel } from 'src/app/core/authorization/authentication-response.model';
import { HttpService } from 'src/app/core/http/http.service';
import { AuthenticateUserModel } from '../../models/authenticate-user.model';

const apiBaseUrl = "http://localhost:64764/api/account";

@Injectable()
export class AccountService {

    constructor(private readonly httpService: HttpService) { }

    login(user: AuthenticateUserModel) {
        return this.httpService.get<AuthUserModel>(`${apiBaseUrl}/login`, user)
    }
}