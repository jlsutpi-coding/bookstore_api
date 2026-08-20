import prisma from "../lib/prisma";
import type { Request, Response } from "express";

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
