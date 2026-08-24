import z from "zod";

export const CreateBookSchema = z.object({
  title: z.string().min(1, { message: "Book title is required." }).trim(),
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
  authorId: z
    .number()
    .int()
    .positive({ message: "Author ID must be a positive integer" }),
});

export const SearchBookSchema = z
  .string({ message: "Book title is required." })
  .min(1, { message: "Book title cannot be empty." })
  .trim();

export const UpdateBookSchema = CreateBookSchema.partial();
