import type { Prisma } from "../../generated/prisma/client";
import {
  CreateAuthorSchema,
  UpdateAuthorSchema,
} from "../schemas/authors.schema";

export const validateCreateAuthor = (data: unknown) => {
  const result = CreateAuthorSchema.safeParse(data);

  if (!result.success) {
    return {
      error: result.error.issues,
      data: null,
    };
  }

  return {
    error: null,
    data: result.data as Prisma.AuthorUncheckedCreateInput,
  };
};

export const validateUpdateAuthor = (data: unknown) => {
  const result = UpdateAuthorSchema.safeParse(data);

  if (!result.success) {
    return {
      error: result.error.issues,
      data: null,
    };
  }

  return {
    error: null,
    data: result.data as Prisma.AuthorUncheckedUpdateInput,
  };
};
