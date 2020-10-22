import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { MessageService } from 'primeng/api';
import { ResponseMessage } from '../models/responseMessage';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(
        private readonly httpClient: HttpClient,
        private readonly messageService: MessageService) { }

    get<TData>(url: string, queryParams?: {}, showDefaultMessage?: boolean) {
        return this.httpClient
            .get<ResponseMessage<TData>>(`${url}?${this.getQuaeryParams(queryParams).toString()}`)
            .pipe(map(response => this.handleResponse(response, showDefaultMessage)))
    }

    post<TData>(url: string, body: any, showDefaultMessage?: boolean) {
        return this.httpClient
            .post<ResponseMessage<TData>>(url, body)
            .pipe(map(response => this.handleResponse(response, showDefaultMessage)))
    }

    private getQuaeryParams(filter: any): URLSearchParams {
        const params = new URLSearchParams();

        for (var field in filter) {
            params.set(field, filter[field])
        }

        return params;
    }

    private handleResponse<TData>(response: ResponseMessage<TData>, showDefaultMessage: boolean) {
        if (response.isSuccess == false) {
            if (!!response.errorMessage) {
                this.messageService.add({ severity: 'error', detail: response.errorMessage })
            }
            else {
                if (showDefaultMessage) {
                    this.messageService.add({ severity: 'error', detail: 'Something went wrong' })
                }
            }
        }
        else {
            if (showDefaultMessage) {
                this.messageService.add({ severity: 'success', detail: 'Operation completed successfully' })
            }

            return response.data;
        }
    }
}

