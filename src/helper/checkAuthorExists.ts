import prisma from "../lib/prisma";

export const checkAuthorExists = async (authorId: number): Promise<boolean> => {
  const authorExists = await prisma.author.findUnique({
    where: { id: authorId },
    select: { id: true },
  });

  return !!authorExists;
};
