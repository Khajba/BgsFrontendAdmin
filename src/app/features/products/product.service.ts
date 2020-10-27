import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { ProductCategory } from 'src/app/models/product-category.model';

const apiBaseUrl = "http://localhost:64764/api/product"

@Injectable()
export class ProductService {

  constructor(private readonly httpService: HttpService) { }

   getProductTypes(){
     return this.httpService.get<ProductCategory[]>(`${apiBaseUrl}/getProductType`)
   }

}