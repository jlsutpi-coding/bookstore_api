import type { Request, Response, NextFunction } from "express";

export const validateLiteraryTalkId = (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction,
) => {
  const { id } = req.params;

  if (isNaN(parseInt(id)) || parseInt(id) <= 0) {
    return res.status(400).json({
      success: false,
      error: "Invalid literary talk ID",
    });
  }

  (req as any).id = parseInt(id);
  next();
};
