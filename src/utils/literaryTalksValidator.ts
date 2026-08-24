import type { Prisma } from "../../generated/prisma/client";
import { checkAuthorExists } from "../helper/checkAuthorExists";
import {
  CreateLiteraryTalkSchema,
  UpdateLiteraryTalkSchema,
} from "../schemas/literaryTalks.chema";

export const validateCreateLiteraryTalk = (body: unknown) => {
  const result = CreateLiteraryTalkSchema.safeParse(body);

  if (!result.success) {
    return {
      error: result.error.issues,
      data: null,
    };
  }

  return {
    error: null,
    data: result.data as Prisma.LiteraryTalkUncheckedCreateInput,
  };
};

export const validateUpdateLiteraryTalk = async (body: unknown) => {
  const result = UpdateLiteraryTalkSchema.safeParse(body);

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
    data: result.data as Prisma.LiteraryTalkUncheckedUpdateInput,
  };
};
