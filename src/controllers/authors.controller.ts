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

export const getAuthorById = async (req: Request, res: Response) => {
  const { id } = req.params;
};
