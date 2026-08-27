import type { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/CustomError";

const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = "Internal Server Error";
  let details = undefined;

  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    message = err.message;
    details = err.details;
  } else if (err instanceof Error) {
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(details && { details }),
  });
};

export default errorHandler;
