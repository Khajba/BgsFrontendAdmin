import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';

@Injectable()
export class ProductService {

  constructor(private readonly http: HttpService) { }
  
}