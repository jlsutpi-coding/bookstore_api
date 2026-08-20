import type { Request, Response, NextFunction } from "express";

export const validateAuthorId = (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const authorId = parseInt(id);

  if (isNaN(authorId) || authorId <= 0) {
    return res.status(400).json({
      success: false,
      error: "Invalid author ID",
    });
  }

  (req as any).id = authorId;
  next();
};
