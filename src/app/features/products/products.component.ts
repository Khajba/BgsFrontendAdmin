import { Component, OnInit } from '@angular/core';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { ProductListItem } from 'src/app/models/product.models';
import { ProductCategory } from 'src/app/models/product-category.model';
import { ProductFilter } from 'src/app/models/product-filter';
import { ProductService } from './product.service';
import { PaginatorModel } from 'src/app/models/paginator.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  categories: SelectItem[] = [];
  paginator: PaginatorModel = new PaginatorModel(0, 15);
  filter: ProductFilter = {
    pageNumber: this.paginator.pageNumber,
    pageSize: this.paginator.pageSize
  };
  products: ProductListItem[] = [];

  constructor(
    private readonly productService: ProductService,
    private readonly confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.getProductCategories();
    this.getProducts();
    this.getProductCount();
  }

  clearClick() {
    this.filter = {
      pageNumber: this.paginator.pageNumber,
      pageSize: this.paginator.pageSize
    };
    this.getProducts();
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

  searchClick() {
    this.getProducts();
    this.getProductCount();
  }

  getProducts() {
    this.filter.pageNumber = this.paginator.pageNumber;
    this.filter.pageSize = this.paginator.pageSize;
    this.productService.getProdcuts(this.filter).subscribe(
      response => {
        this.products = response;
      });
  }

  getProductCount() {
    this.productService.getProductsCount(this.filter).subscribe(
      response => {
        this.paginator.totalRecords = response;
      });
  }

  onPaginate(event: { page: number, rows: number }) {
    this.paginator.pageNumber = event.page;
    this.paginator.pageSize = event.rows;

    this.getProducts();
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(
      response => {
        this.getProducts();
      });
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
      });
  }
}
