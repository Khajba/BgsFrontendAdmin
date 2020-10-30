import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { AddStockModel, ProductAttachment, ProductDetails, ProductListItem } from 'src/app/models/product.models';
import { ProductCategory } from 'src/app/models/product-category.model';
import { ProductFilter } from 'src/app/models/product-filter';

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

  getProdcuts(filter: ProductFilter) {
    return this.httpService.get<ProductListItem[]>(`${apiBaseUrl}/getProducts`, filter)
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

  getProductsCount(filter: ProductFilter) {
    return this.httpService.get<number>(`${apiBaseUrl}/getProductsCount`, filter);
  }

  addProductAttachments(productId, files) {
    const formData = new FormData();
    formData.append('productId', productId);
    for (var file of files) {
      formData.append('files', file);
    }
    return this.httpService.post(`${apiBaseUrl}/addProductAttachments`, formData);
  }

  getProductAttachments(productId: number) {
    return this.httpService.get<ProductAttachment[]>(`${apiBaseUrl}/getProductAttachments`, { productId })
  }
}