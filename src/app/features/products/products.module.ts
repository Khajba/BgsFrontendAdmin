import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductService } from './product.service';
import { BgsSharedModule } from 'src/app/shared/bgs-shared.module';
import { FormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './product-details/product-details.component';

@NgModule({
  declarations: [
    ProductsComponent,
    ProductDetailsComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    BgsSharedModule,
    FormsModule
  ],
  providers: [
    ProductService
  ]
})
export class ProductsModule { }