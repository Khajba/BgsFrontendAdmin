import { Component, OnInit } from '@angular/core';
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

  constructor(private readonly productService: ProductService) { }

  ngOnInit() {
    this.getProductTypes();
  }

  private getProductTypes() {
    this.productService.getProductTypes().subscribe(
      response => {
        this.categories = response;
      }
    )
  }
}
