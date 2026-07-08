import type { Request, Response } from "express";
import prisma from "../lib/prisma";

// @desc Get all books
// @route GET /api/books
// @access Public

export const getBooks = async (req: Request, res: Response) => {
  try {
    const books = await prisma.book.findMany();
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

// @desc Create a new Book
// @route POST /api/books
// @access Public

export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author, price, stockQuantity } = req.body;

    // Validate title and author
    const trimmedTitle = title?.trim();
    const trimmedAuthor = author?.trim();
    if (!trimmedTitle || !trimmedAuthor) {
      return res.status(400).json({
        success: false,
        error: "Title and author are required",
      });
    }

    // Validate price
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice < 0) {
      return res.status(400).json({
        success: false,
        error: "Price must be a positive number",
      });
    }

    //Validate stock quantity
    const parsedStock = parseInt(stockQuantity);
    if (
      isNaN(parsedStock) ||
      parsedStock < 0 ||
      !Number.isInteger(parsedStock)
    ) {
      return res.status(400).json({
        success: false,
        error: "Stock quantity must be a non-negative integer",
      });
    }

    const newBook = await prisma.book.create({
      data: {
        title: trimmedTitle,
        author: trimmedAuthor,
        price: parsedPrice,
        stockQuantity: parsedStock,
      },
    });

    res.status(201).json({
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
