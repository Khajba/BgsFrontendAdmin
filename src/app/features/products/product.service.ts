import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { Product } from 'src/app/models/product';
import { ProductCategory } from 'src/app/models/product-category.model';

const apiBaseUrl = "http://localhost:64764/api/product"

@Injectable()
export class ProductService {

  constructor(private readonly httpService: HttpService) { }

  getProductCategories() {
    return this.httpService.get<ProductCategory[]>(`${apiBaseUrl}/getProductCategories`)
  }

  addProduct(product: Product) {
    return this.httpService.post<number>(`${apiBaseUrl}/addProduct`, product, true);
  }

  updateProduct(product: Product) {
    return this.httpService.post(`${apiBaseUrl}/updateProduct`, product, true);
  }

  getProdcuts() {
    return this.httpService.get<Product[]>(`${apiBaseUrl}/getProducts`)
  }

}