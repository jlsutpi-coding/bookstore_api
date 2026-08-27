import type { NextFunction, Request, Response } from "express";

import prisma from "../lib/prisma";

import {
  validateCreateBook,
  validateSearchBook,
  validateUpdateBook,
} from "../utils/booksValidator";
import { CustomError } from "../utils/CustomError";

// @desc Get all books
// @route GET /api/books
// @access Public
export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await prisma.book.findMany();
    return res.json({
      success: true,
      data: books,
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch books",
    });
  }
};

// @desc Get a single book by ID
// @route GET /api/books/:id
// @access Public
export const getBookById = async (
  req: Request<{}, {}, { id: string }>,
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
    console.error("Error fetching book:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch book",
    });
  }
};

// @desc Create a new Book
// @route POST /api/books
export const createBook = async (req: Request, res: Response) => {
  const { error, data } = await validateCreateBook(req.body);
  if (error || !data) {
    return res.status(400).json({
      success: false,
      error: error,
    });
  }
  try {
    const newBook = await prisma.book.create({ data });

    return res.status(201).json({
      success: true,
      data: newBook,
      message: "Book created successfully",
    });
  } catch (error) {
    console.error("Error creating book:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to create book. Please try again later.",
    });
  }
};

// @desc Update a single book
// @route PUT /api/books/:id
export const updateBook = async (
  req: Request<{}, {}, { id: string }>,
  res: Response,
) => {
  const id = (req as any).id;
  const bookId = parseInt(id, 10);

  const { error, data } = await validateUpdateBook(req.body);

  if (error || !data) {
    return res.status(400).json({
      success: false,
      error,
    });
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
    // Prisma code for "Record to delete does not exist."
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        error: "An unexpected error occured while updating the book.",
      });
    }
    console.error("Error updating book:", error);

    return res.status(500).json({
      success: false,
      error: "Failed to update book.",
    });
  }
};

// @desc Delete a single book
// @route DELETE /api/books/:id
export const deleteBook = async (req: Request, res: Response) => {
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
    // Prisma code for "Record to delete does not exist."
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        error: "An unexpected error occured while deleting the book.",
      });
    }

    console.error("Deleting book error", error);
    return res.status(500).json({
      success: false,
      error: "Failed to delete the book. Ensure the ID is valid.",
    });
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
    return res.status(400).json({ success: false, error });
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
    console.error("Searching book error:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to search the book.",
    });
  }
};
