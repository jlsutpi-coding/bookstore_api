import type { BaseBookInput } from "../types/book.types";

export interface ValidatedBookData {
  title: string;
  author: string;
  price: number;
  stockQuantity: number;
}

export const validateBookPayload = (
  body: BaseBookInput,
): { error: string | null; data: ValidatedBookData | null } => {
  const { title, author, price, stockQuantity } = body;

  // 1. Validate title and author
  const trimmedTitle = title?.trim();
  const trimmedAuthor = author?.trim();
  if (!trimmedTitle || !trimmedAuthor) {
    return { error: "Title and author are required", data: null };
  }

  // 2. Validate price
  const parsedPrice =
    typeof price === "number" ? price : parseFloat(price || "");
  if (isNaN(parsedPrice) || parsedPrice < 0) {
    return { error: "Price must be a valid non-negative number", data: null };
  }

  // 3. Validate stock quantity (The bug-free number version)
  const stockNum =
    typeof stockQuantity === "number" ? stockQuantity : Number(stockQuantity);
  if (isNaN(stockNum) || stockNum < 0 || !Number.isInteger(stockNum)) {
    return {
      error: "Stock quantity must be a non-negative integer",
      data: null,
    };
  }

  return {
    error: null,
    data: {
      title: trimmedTitle,
      author: trimmedAuthor,
      price: parsedPrice,
      stockQuantity: stockNum,
    },
  };
};
