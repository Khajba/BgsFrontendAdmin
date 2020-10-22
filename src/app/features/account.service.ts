import { Injectable } from "@angular/core";
import { HttpService } from '../http/http.service';
import { User } from '../models/user';

const apiBaseUrl = "http://localhost:64764/api/account";

@Injectable()
export class AccountService {

    constructor(private readonly httpService: HttpService) { }

    login(user: User) {
        return this.httpService.get(`${apiBaseUrl}/login`, user)
    }


}