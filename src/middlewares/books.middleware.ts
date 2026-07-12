import type { NextFunction, Request, Response } from "express";

export const validateBookId = (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;
  const bookId = parseInt(id);

  if (isNaN(bookId) || bookId <= 0) {
    return res.status(400).json({
      success: false,
      error: "Invalid book ID",
    });
  }

  req.params.id = String(bookId);
  next();
};
