import { Component } from '@angular/core';
import { HttpService } from 'src/app/core/http/http.service';
import { ProductService } from './product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  constructor(private readonly productService: ProductService, private readonly http: HttpService) { }

  ngOnInit() {
    this.http.get<string>('http://localhost:64764/api/account/test').subscribe()
  }
}
