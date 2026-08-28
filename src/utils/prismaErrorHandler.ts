import { Prisma } from "../../generated/prisma/client";
import { CustomError } from "./CustomError";

export const handlePrismaError = (error: unknown) => {
  console.log("Prisma error:", error);
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002": // Unique constraint failed
        return new CustomError("Duplicate entery detected", 409, error);
      case "P2025": // Record not found
        return new CustomError("Record not found", 404, error);
      case "P2003": // Foreign key constraint   failed
        return new CustomError("Related record doesn't exist", 400, error);
      case "P2023": // Invalid value for field type
        return new CustomError("Invalid data type provided", 400, error);
      case "P2014": // Required realation violation
        return new CustomError("Invalid relation", 400, error);

      default:
        return new CustomError("Database error ", 500, error);
    }
  }

  if (error instanceof Prisma.PrismaClientInitializationError) {
    return new CustomError("Database connection failed", 503, error);
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return new CustomError("Invalid data provided", 400, error);
  }

  return new CustomError("Internal server error", 500);
};
