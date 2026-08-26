import type { NextFunction, Request, Response } from "express";
import type { CustomError } from "../utils/CustomError";

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.statusCode) {
    res.status(err.statusCode).json({ success: false, error: err.message });
  } else {
    res.status(500).json({ success: false, error: err.message });
  }
};

export default errorHandler;
