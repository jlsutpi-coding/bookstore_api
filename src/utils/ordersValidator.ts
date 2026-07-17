import z from "zod";

import prisma from "../lib/prisma";

// 1. Define allowed status (reusable)
const OrderStatusEnum = z.enum([
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
]);

// 2. Base Shema (shared)
const BaseOrderSchema = z.object({
  bookId: z.number().int().positive(),
  customerName: z.string().min(1, { message: "Name is required" }),
  quantity: z
    .number()
    .int()
    .positive({ message: "Quantity must be 1 or greater." }),
});

// 3. Schema for CREATE (no status)
export const CreateOrderSchema = BaseOrderSchema;

// 4. Schema for UPDATE ()
export const UpdateOrderSchema = BaseOrderSchema.partial().extend({
  status: OrderStatusEnum.optional(),
});

export const validateCreateOrder = async (body: unknown) => {
  const result = CreateOrderSchema.safeParse(body);

  if (!result.success) {
    return { error: result.error.message, data: null };
  }

  const book = await prisma.book.findUnique({
    where: { id: result.data.bookId },
  });

  if (!book) {
    return {
      error: "Invalid ID.",
      data: null,
    };
  }
  return { data: result.data, error: null };
};

export const validateUpdateOrder = async (body: unknown) => {
  const result = UpdateOrderSchema.safeParse(body);

  if (!result.success) {
    return { error: result.error.message, data: null };
  }

  const data = result.data;
  if (data.bookId !== undefined) {
    const book = await prisma.book.findUnique({ where: { id: data.bookId } });
    if (!book) {
      return {
        error: "Book not found with the given ID",
        data: null,
      };
    }
  }
  return { data, error: null };
};
