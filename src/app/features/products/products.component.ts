import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
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
  product: Product = {};
  products: Product[] = [];

  constructor(private readonly productService: ProductService) { }

  ngOnInit() {
    this.getProductCategories();
    this.getProdcuts();
  }

  clearClick() {
    this.filter = {};
  }

  getProdcuts(){
    return this.productService.getProdcuts().subscribe(
      response => {
        this.products=response;
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
