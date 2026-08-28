import type { NextFunction, Request, Response } from "express";
import { CustomError } from "../utils/CustomError";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  return next(new CustomError("Not Found", 404));
};
