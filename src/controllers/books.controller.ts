import type { Request, Response } from "express";
import prisma from "../lib/prisma";

// @desc Get all books
// @route GET /api/books
// @access Public

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await prisma.book.findMany();
    console.log(books);
    res.json({
      success: true,
      data: books,
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch books",
    });
  }
};

// @desc Get a single book by ID
// @route GET /api/books/:id
// @access Public

export const getBookById = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || typeof id !== "string") {
    return res.status(400).json({
      success: false,
      error: "Invalid book ID",
    });
  }

  try {
    const book = await prisma.book.findUnique({
      where: { id: parseInt(id) },
    });
    if (book) {
      res.json({
        success: true,
        data: book,
      });
    } else {
      res.status(404).json({
        success: false,
        error: "Book not found",
      });
    }
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch book",
    });
  }
};

export const createBook = async (req: Request, res: Response) => {
  const book = req.body;
  console.log(book);
  res.status(200).json("ok");
};
