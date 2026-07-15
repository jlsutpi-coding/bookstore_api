import prisma from "../lib/prisma";
import type { CreateOrderInput } from "../types/orders.types";

export interface ValidatedOrderData {
  bookId: number;
  customerName: string;
  quantity: number;
}

export const validatedOrderPayload = async (
  body: CreateOrderInput,
): Promise<{ data: ValidatedOrderData | null; error: string | null }> => {
  const { bookId, customerName, quantity } = body;

  // 1. validate bookId
  if (typeof bookId !== "number" || !Number.isInteger(bookId) || bookId <= 0) {
    return {
      error: "Invalid ID.",
      data: null,
    };
  }

  const book = await prisma.book.findUnique({
    where: { id: bookId },
  });

  if (!book) {
    return {
      error: "Invalid ID.",
      data: null,
    };
  }

  // 2. validate name
  if (typeof customerName !== "string" || !customerName.trim()) {
    return {
      error: "Name is required.",
      data: null,
    };
  }

  // 3. validate quantity
  if (typeof quantity !== "number" || quantity < 1) {
    return {
      error: "Quantity is required and must be 1 or greater.",
      data: null,
    };
  }

  return {
    data: {
      bookId,
      customerName: customerName.trim(),
      quantity,
    },
    error: null,
  };
};
