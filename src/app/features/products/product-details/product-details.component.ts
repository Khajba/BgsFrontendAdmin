import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, SelectItem } from 'primeng/api';
import { AddStockModel, ProductAttachment, ProductDetails, ProductListItem } from 'src/app/models/product.models';
import { ProductCategory } from 'src/app/models/product-category.model';
import { ProductService } from '../product.service';
import { Artist, Designer, Mechanic } from 'src/app/models/categories.model';
import { CategoryService } from '../../categories/category.service';

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

  artist: Artist = {};
  designer: Designer = {};
  mechanic: Mechanic = {};

  artists: SelectItem[] = [];
  designers: SelectItem[] = [];
  mechanics: SelectItem[] = [];

  constructor(
    private readonly productService: ProductService,
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly confirmatioService: ConfirmationService,
    private readonly categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getProductCategories();
    this.getArtists();
    this.getDesigners();
    this.getMechanics();

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

  setAsPrimaryClick(attachment: ProductAttachment) {
    this.setPrimaryAttachment(attachment);
  }

  removeClick(attachmentId: number) {
    this.confirmatioService.confirm({
      header: 'Remove Confirmation',
      message: 'Do you want to delete this attachment?',
      accept: () => {
        this.removeProductAttachment(attachmentId);
      }
    })

  }

  uploadAttachemnts(event: any) {
    this.productService.addProductAttachments(this.product.id, event.files).subscribe(
      response => {
        this.getProductById(this.product.id);
        this.getProductAttachments();
        this.displayUploadDialog = false;
      }
    );
  }

  setPrimaryAttachment(attachment: ProductAttachment) {
    this.productService.setPrimaryAttachment(this.product.id, attachment.id).subscribe(
      response => {
        this.product.primaryAttachmentUrl = attachment.attachmentUrl;
      }
    )
  }

  removeProductAttachment(attachmentId: number) {
    this.productService.removeProductAttachment(attachmentId).subscribe(
      response => {
        this.getProductAttachments();
      }
    )
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

  private getArtists() {
    this.categoryService.getArtists().subscribe(
      respnse => {
        this.artists = respnse.map(a => {
          return <SelectItem>{
            value: a.id,
            label: a.name
          }
        })
      }
    )
  }

  private getDesigners() {
    this.categoryService.getDesigners().subscribe(
      response => {
        this.designers = response.map(d =>{
          return <SelectItem>{
            value: d.id,
            label: d.name
          }
        } )
      }
    )
  }

  private getMechanics() {
    this.categoryService.getMechanics().subscribe(
      response => {
        this.mechanics = response.map(m =>{
          return <SelectItem>{
            value: m.id,
            label: m.name
          }
        })
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
