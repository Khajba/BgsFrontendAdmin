export interface ProductFilter {
    categoryId?: number;
    name?: string;
    priceFrom?: number;
    priceTo?: number;
    stockFrom?: number;
    stockTo?: number;
    pageNumber: number;
    pageSize: number;
    artistId?:number;
    designerId?:number;
    mechanicsId?:number;
}