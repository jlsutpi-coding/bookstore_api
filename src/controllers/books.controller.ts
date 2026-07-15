import type { Request, Response } from "express";

import prisma from "../lib/prisma";

import type { CreateBookInput, UpdateBookInput } from "../types/books.types";
import { validateBookPayload } from "../utils/booksValidator";

// @desc Get all books
// @route GET /api/books
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
      error: "Failed to fetch books.",
    });
  }
};

// @desc Get a single book by ID
// @route GET /api/books/:id
export const getBookById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.params;
  const bookId = parseInt(id, 10);

  try {
    const book = await prisma.book.findUnique({
      where: { id: bookId },
    });
    if (!book) {
      return res.status(400).json({
        success: false,
        error: "Book not found.",
      });
    }
    return res.json({
      success: true,
      data: book,
    });
  } catch (error: any) {
    // Prisma code for "Record to delete does not exist."
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        error: "An unexpected error occured while searching the book.",
      });
    }
    console.error("Error fetching book:", error);
    return res.status(500).json({
      success: false,
      error: "Failed to fetch book.",
    });
  }
};

// @desc Search a book from books
// @route GET /api/books/search?q=searchTerm

export const searchBook = async (req: Request, res: Response) => {
  const searchTerm = (req.query.q as string)?.trim();

  if (!searchTerm) {
    return res.status(400).json({
      success: false,
      error: "Please provide a search using ?q=",
    });
  }
  try {
    const results = await prisma.book.findMany({
      where: {
        title: {
          contains: searchTerm,
        },
      },
    });
    return res.json({
      success: true,
      data: results,
    });
  } catch (error) {
    console.error("Searching book error", error);
    return res.status(500).json({
      success: false,
      error: "Failed to search book.",
    });
  }
};

// @desc Create a new Book
// @route POST /api/books
export const createBook = async (
  req: Request<{}, {}, CreateBookInput>,
  res: Response,
) => {
  const { error, data } = validateBookPayload(req.body);
  if (error || !data) {
    return res.status(400).json({ success: false, error });
  }
  try {
    const newBook = await prisma.book.create({ data });

    return res.status(201).json({
      success: true,
      data: newBook,
      message: "Book created successfully.",
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
// @route GET /api/books/:id
export const updateBook = async (
  req: Request<{ id: string }, {}, UpdateBookInput>,
  res: Response,
) => {
  const { id } = req.params;

  // Validate ID
  const bookId = parseInt(id);

  const { error, data } = validateBookPayload(req.body);

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
export const deleteBook = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.params;
  try {
    await prisma.book.delete({
      where: {
        id: Number(id),
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
