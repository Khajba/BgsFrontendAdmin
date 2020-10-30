import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectItem } from 'primeng/api';
import { AddStockModel, ProductDetails, ProductListItem } from 'src/app/models/product.models';
import { ProductCategory } from 'src/app/models/product-category.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: ProductDetails = {};

  addStockModel: AddStockModel = {};

  categories: SelectItem[] = [];

  displayProductDialog: boolean;

  displayUploadDialog: boolean;

  constructor(
    private readonly productService: ProductService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProductCategories();

    const productId = +this.activatedRoute.snapshot.paramMap.get('id');

    if (productId > 0) {
      this.getProductById(productId);
    }
  }

  addStockClick() {
    this.addStockModel = {
      productId: this.product.id
    };
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

  uploadClick() {
    this.displayUploadDialog = true;
  }

  uploadAttachemnts(event: any) {
    this.productService.addProductAttachments(this.product.id, event.files).subscribe(
      response => {
        this.getProductAttachments();
        this.displayUploadDialog = false;
      }
    );
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

  addStock() {
    this.productService.addProductStock(this.addStockModel).subscribe(
      response => {
        this.getProductStock();
        this.displayProductDialog = false;
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

  private getProductById(id: number) {
    this.productService.getProductById(id).subscribe(
      response => {
        this.product = response;
      }
    )
  }

  private getProductStock() {
    this.productService.getProductStock(this.product.id).subscribe(
      response => {
        this.product.stock = response;
      }
    )
  }

  private getProductAttachments() {
    this.productService.getProductAttachments(this.product.id).subscribe(
      response => {
        this.product.attachments = response;
      }
    )
  }
}
