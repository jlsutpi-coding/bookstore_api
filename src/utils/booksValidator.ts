import type { Prisma } from "@prisma/client/extension";
import z from "zod";

// import type { Prisma } from "../../generated/prisma/client";

export const CreateBookSchema = z.object({
  title: z.string().min(1, { message: "Book title is required." }).trim(),
  author: z.string().min(1, { message: "Book author is required." }).trim(),
  isbn: z.string().nullable().optional(),

  price: z
    .number()
    .nonnegative({ message: "Price must be a valid non-negative number" })
    .nullable()
    .optional(),
  genre: z.string().nullable().optional(),
  stockQuantity: z
    .number()
    .int()
    .nonnegative({ message: "Stock quantity must be 0 or positive" }),
  publishedYear: z.number().int().nullable().optional(),
  rating: z.number().min(0).max(5).nullable().optional(),
});

export const validateCreateBook = (body: unknown) => {
  const result = CreateBookSchema.safeParse(body);

  if (!result.success) {
    return { error: result.error.message, data: null };
  }

  return {
    error: null,
    data: result.data as Prisma.BookCreateInput,
  };
};
