import type { Prisma } from "../../generated/prisma/client";

import { checkAuthorExists } from "../helper/checkAuthorExists";
import {
  CreateBookSchema,
  SearchBookSchema,
  UpdateBookSchema,
} from "../schemas/books.schema";

export const validateCreateBook = async (body: unknown) => {
  const result = CreateBookSchema.safeParse(body);

  if (!result.success) {
    return { error: result.error.issues, data: null };
  }
  if (result.data.authorId) {
    const exists = await checkAuthorExists(result.data.authorId);
    if (!exists) {
      return {
        error: [{ message: "Author not found" }],
        data: null,
      };
    }
  }
  return {
    error: null,
    data: result.data as Prisma.BookUncheckedCreateInput,
  };
};

export const validateUpdateBook = async (body: unknown) => {
  const result = UpdateBookSchema.safeParse(body);

  if (!result.success) {
    return {
      error: result.error.issues,
      data: null,
    };
  }

  if (result.data.authorId) {
    const exists = await checkAuthorExists(result.data.authorId);
    if (!exists) {
      return {
        error: [{ message: "Author not found" }],
        data: null,
      };
    }
  }
  return {
    error: null,
    data: result.data as Prisma.BookUncheckedUpdateInput,
  };
};

export const validateSearchBook = (param: unknown) => {
  const result = SearchBookSchema.safeParse(param);
  if (!result.success) {
    return {
      error: result.error.message,
      data: null,
    };
  }

  return {
    error: null,
    data: result.data,
  };
};
