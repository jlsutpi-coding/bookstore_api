import type { Prisma } from "../../generated/prisma/client";
import { CreateLiteraryTalkSchema } from "../schemas/literaryTalks.chema";

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
