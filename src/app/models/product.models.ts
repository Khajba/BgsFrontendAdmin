export interface ProductListItem {
    id?: number;
    primaryAttachmentUrl?: string;
    category?: string;
    name?: string;
    price?: number;
    stock?: number;
}

export interface ProductDetails {
    id?: number;
    primaryAttachmentUrl?: string;
    categoryId?: number;
    name?: string;
    price?: number;
    stock?: number;
    description?: string;
    attachments?: ProductAttachment[];
}

export interface ProductAttachment {
    id?: number;
    attachmentUrl?: string;
}

export interface AddStockModel {
    productId?: number;
    quantity?: number;
}