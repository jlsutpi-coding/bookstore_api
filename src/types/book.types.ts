export interface BaseBookInput {
  title?: string;
  author?: string;
  price?: string | number;
  stockQuantity?: string | number;
}

export interface CreateBookInput extends BaseBookInput {}
export interface UpdateBookInput extends BaseBookInput {}
