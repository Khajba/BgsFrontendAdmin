import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { Product } from 'src/app/models/product';
import { ProductCategory } from 'src/app/models/product-category.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = {};

  categories: SelectItem[] = [];

  displayProductDialog: boolean;

  constructor(
    private readonly productService: ProductService,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.getProductCategories();
  }

  clickStock() {
    this.product = {}
    this.displayProductDialog = true;
  }


  saveClick() {
    if (this.product.id) {
      this.updateProduct();
    }
    else {
      this.addProduct();
    }

  }

  addProduct() {
    return this.productService.addProduct(this.product).subscribe(
      productId => {
        this.product.id = productId;
        this.router.navigate(['products', productId]);
      }
    )
  }

  updateProduct() {
    return this.productService.updateProduct(this.product).subscribe(
      response => {

      }
    )
  }

  private getProductCategories() {
    this.productService.getProductCategories().subscribe(
      response => {
        this.categories = response.map(c => {
          return <SelectItem>{
            value: c.id,
            label: c.name
          };
        });
      }
    )
  }
}
