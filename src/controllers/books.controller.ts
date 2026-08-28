import type { NextFunction, Request, Response } from "express";

import prisma from "../lib/prisma";

import {
  validateCreateBook,
  validateSearchBook,
  validateUpdateBook,
} from "../utils/booksValidator";
import { CustomError } from "../utils/CustomError";
import { handlePrismaError } from "../utils/prismaErrorHandler";

// @desc Get all books
// @route GET /api/books
// @access Public
export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const books = await prisma.book.findMany();
    return res.json({
      success: true,
      data: books,
    });
  } catch (error) {
    return next(handlePrismaError(error));
  }
};

// @desc Get a single book by ID
// @route GET /api/books/:id
// @access Public
export const getBookById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = (req as any).id;

  try {
    const book = await prisma.book.findUnique({
      where: { id: parseInt(id) },
    });
    if (book) {
      return res.json({
        success: true,
        data: book,
      });
    } else {
      return next(new CustomError("Book not found.", 404));
    }
  } catch (error) {
    return next(handlePrismaError(error));
  }
};

// @desc Create a new Book
// @route POST /api/books
export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error, data } = await validateCreateBook(req.body);
  if (error) {
    return next(new CustomError("Bad request", 400, error));
  }
  try {
    const newBook = await prisma.book.create({ data });

    return res.status(201).json({
      success: true,
      data: newBook,
      message: "Book created successfully",
    });
  } catch (error) {
    return next(handlePrismaError(error));
  }
};

// @desc Update a single book
// @route PUT /api/books/:id
export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = (req as any).id;
  const bookId = parseInt(id, 10);

  const { error, data } = await validateUpdateBook(req.body);

  if (error) {
    return next(new CustomError("Bad request", 400, error));
  }

  try {
    const book = await prisma.book.update({
      where: { id: bookId },
      data: data,
    });

    return res.json({
      success: true,
      data: book,
      message: "Book updated successfully.",
    });
  } catch (error: any) {
    return next(handlePrismaError(error));
  }
};

// @desc Delete a single book
// @route DELETE /api/books/:id
export const deleteBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = (req as any).id;
  try {
    await prisma.book.delete({
      where: {
        id: id,
      },
    });

    return res.json({
      success: true,
      message: "Book deleted successfully.",
    });
  } catch (error: any) {
    return next(handlePrismaError(error));
  }
};

// @desc Search a book
// @route GET /api/books?q=bookName
export const searchBook = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { q } = req.query;
  const { error, data } = validateSearchBook(q);

  if (error || !data) {
    return next(new CustomError("Bad request", 400, error));
  }

  try {
    const book = await prisma.book.findFirst({
      where: {
        title: {
          contains: data, // Using 'contains' for partial search (optional but common for search)
          mode: "insensitive", // Case-insensitive search
        },
      },
    });

    if (!book) {
      return next(new CustomError("Book is not found with that title!", 404));
    }

    return res.json({
      success: true,
      data: book,
    });
  } catch (error) {
    return next(handlePrismaError(error));
  }
};
