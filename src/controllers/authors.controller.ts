import prisma from "../lib/prisma";

import type { NextFunction, Request, Response } from "express";

import {
  // validateCreateAuthor,
  validateUpdateAuthor,
} from "../utils/authorsValidator";
import { CustomError } from "../utils/CustomError";
import { handlePrismaError } from "../utils/prismaErrorHandler";

// @desc Get all authors
// @route GET /api/authors
// @access Public
export const getAuthors = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authors = await prisma.author.findMany();
    return res.json({
      success: true,
      data: authors,
    });
  } catch (error) {
    return next(handlePrismaError(error));
  }
};

// @desc Get a single author by ID
// @route GET /api/authors/:id
// @access Public
export const getAuthorById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = (req as any).id;
  try {
    const author = await prisma.author.findUnique({
      where: { id: id },
    });
    if (author) {
      res.json({
        success: true,
        data: author,
      });
    } else {
      return next(new CustomError("Author not found", 404));
    }
  } catch (error) {
    return next(handlePrismaError(error));
  }
};

// @desc Create a new author
// @route POST /api/authors
// @access Public
// export const createAuthor = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const { data, error } = validateCreateAuthor(req.body);

//   if (error) {
//     return next(new CustomError("Validation fail", 400, error));
//   }

//   try {
//     const newAuthor = await prisma.author.create({
//       data: data,
//     });

//     return res.status(201).json({
//       success: true,
//       data: newAuthor,
//     });
//   } catch (error) {
//     return next(handlePrismaError(error));
//   }
// };

// @desc Update an existing author
// @route PUT /api/authors/:id
// @access Public
// export const updateAuthor = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   const id = (req as any).id;

//   const { data, error } = validateUpdateAuthor(req.body);

//   if (error) {
//     return next(new CustomError("Bad request", 400, error));
//   }

//   try {
//     const updatedAuthor = await prisma.author.update({
//       where: { id: id },
//       data: data,
//     });
//     return res.json({
//       success: true,
//       data: updatedAuthor,
//     });
//   } catch (error: any) {
//     return next(handlePrismaError(error));
//   }
// };

// @desc Delete an author by ID
// @route DELETE /api/authors/:id
// @access Public
export const deleteAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = (req as any).id;

  try {
    const deletedAuthor = await prisma.author.delete({
      where: { id: id },
    });
    return res.json({
      success: true,
      data: deletedAuthor,
    });
  } catch (error: any) {
    return next(handlePrismaError(error));
  }
};
