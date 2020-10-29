import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { AddStockModel, ProductDetails, ProductListItem } from 'src/app/models/product.models';
import { ProductCategory } from 'src/app/models/product-category.model';

const apiBaseUrl = "http://localhost:64764/api/product"

@Injectable()
export class ProductService {

  constructor(private readonly httpService: HttpService) { }

  getProductCategories() {
    return this.httpService.get<ProductCategory[]>(`${apiBaseUrl}/getProductCategories`)
  }

  addProduct(product: ProductDetails) {
    return this.httpService.post<number>(`${apiBaseUrl}/addProduct`, product, true);
  }

  updateProduct(product: ProductDetails) {
    return this.httpService.post(`${apiBaseUrl}/updateProduct`, product, true);
  }

  getProdcuts() {
    return this.httpService.get<ProductListItem[]>(`${apiBaseUrl}/getProducts`)
  }

  deleteProduct(id: number) {
    return this.httpService.post(`${apiBaseUrl}/DeleteProduct`, { id }, true);
  }

  getProductById(id: number) {
    return this.httpService.get<ProductDetails>(`${apiBaseUrl}/getProductById`, { id })
  }

  addProductStock(addStockModel: AddStockModel) {
    return this.httpService.post(`${apiBaseUrl}/addProductStock`, addStockModel, true)
  }

  getProductStock(productId: number) {
    return this.httpService.get<number>(`${apiBaseUrl}/getProductStock`, { productId });
  }
}