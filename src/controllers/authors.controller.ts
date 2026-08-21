import prisma from "../lib/prisma";

import type { Request, Response } from "express";

import {
  validateCreateAuthor,
  validateUpdateAuthor,
} from "../utils/authorsValidator";

// @desc Get all authors
// @route GET /api/authors
// @access Public
export const getAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await prisma.author.findMany();
    return res.json({
      success: true,
      data: authors,
    });
  } catch (error) {
    console.error("Error fetching authors:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch authors",
    });
  }
};

// @desc Get a single author by ID
// @route GET /api/authors/:id
// @access Public
export const getAuthorById = async (req: Request, res: Response) => {
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
      res.status(404).json({
        success: false,
        error: "Author not found",
      });
    }
  } catch (error) {
    console.error("Error fetching author:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch author",
    });
  }
};

// @desc Create a new author
// @route POST /api/authors
// @access Public
export const createAuthor = async (req: Request, res: Response) => {
  const { data, error } = validateCreateAuthor(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }

  try {
    const newAuthor = await prisma.author.create({
      data: data,
    });

    return res.status(201).json({
      success: true,
      data: newAuthor,
    });
  } catch (error) {
    console.error("Error creating author:", error);

    res.status(500).json({
      success: false,
      error: "Failed to create author",
    });
  }
};

// @desc Update an existing author
// @route PUT /api/authors/:id
// @access Public
export const updateAuthor = async (req: Request, res: Response) => {
  const id = (req as any).id;

  const { data, error } = validateUpdateAuthor(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }

  try {
    const updatedAuthor = await prisma.author.update({
      where: { id: id },
      data: data,
    });
    return res.json({
      success: true,
      data: updatedAuthor,
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
