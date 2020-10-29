import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ProductListItem } from 'src/app/models/product.models';
import { ProductCategory } from 'src/app/models/product-category.model';
import { ProductFilter } from 'src/app/models/product-filter';
import { ProductService } from './product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  categories: ProductCategory[] = [];
  selectedCategory: ProductCategory;
  filter: ProductFilter = {};
  products: ProductListItem[] = [];
  product: ProductListItem = {};

  constructor(
    private readonly productService: ProductService,
    private readonly confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.getProductCategories();
    this.getProdcuts();
  }

  clearClick() {
    this.filter = {};
  }

  deleteClick(id: number) {
    this.confirmationService.confirm({
      header: 'Delete Confirmation',
      message: 'Do you want to delete this record?',
      accept: () => {
        this.deleteProduct(id);
      }
    })
  }

  getProdcuts() {
    return this.productService.getProdcuts().subscribe(
      response => {
        this.products = response;
      }
    )
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(
      response => {
        this.getProdcuts();
      }
    )
  }

  private getProductCategories() {
    this.productService.getProductCategories().subscribe(
      response => {
        this.categories = response;
      }
    )
  }
}
