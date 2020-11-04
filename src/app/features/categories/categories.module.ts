import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { CategoriesRoutingModule } from './categories-routing.module';
import { BgsSharedModule } from 'src/app/shared/bgs-shared.module';
import { CategoryService } from './category.service';

@NgModule({
  declarations: [CategoriesComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    BgsSharedModule
  ],
  providers:[CategoryService]
})
export class CategoriesModule { }
