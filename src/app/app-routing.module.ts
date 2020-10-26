import { NgModule } from '@angular/core';
import { async } from '@angular/core/testing';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'account', loadChildren: async () => await (await import('./features/account/account.module')).AccountModule},
  {path: 'products', loadChildren: async() => await (await import ('./features/products/products.module')).ProductsModule }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
