import { ProductCategory } from './product-category.model';

export interface Product {
    id?: number;
    categoryId?: number;
    category?: string;
    name?: string;
    price?: number;
    stock?: number;
    description?: string;
    quantity?: number;
}