import type { NextFunction, Request, Response } from "express";

export const validateOrderId = (
  req: Request<{ orderId: string }>,
  res: Response,
  next: NextFunction,
) => {
  const { orderId } = req.params;
  const id = parseInt(orderId);

  if (isNaN(id) || id <= 0) {
    return res.status(400).json({
      success: false,
      error: "Invalid book ID",
    });
  }

  //   req.params.orderId = String(id);
  (req as any).orderIdNumber = id;
  next();
};
