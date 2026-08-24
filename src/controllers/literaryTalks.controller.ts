import prisma from "../lib/prisma";
import type { Request, Response } from "express";
import {
  validateCreateLiteraryTalk,
  validateUpdateLiteraryTalk,
} from "../utils/literaryTalksValidator";

// @desc Get all literary talks
// @route GET /api/literary-talks
// @access Public
export const getLiteraryTalks = async (req: Request, res: Response) => {
  try {
    const literaryTalks = await prisma.literaryTalk.findMany();
    return res.status(200).json({
      success: true,
      data: literaryTalks,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// @desc Get a literary talk by ID
// @route GET /api/literary-talks/:id
// @access Public
export const getLiteraryTalkById = async (req: Request, res: Response) => {
  try {
    const id = (req as any).id;
    const literaryTalk = await prisma.literaryTalk.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!literaryTalk) {
      return res.status(404).json({
        success: false,
        message: "Literary talk not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: literaryTalk,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// @desc Create a new literary talk
// @route POST /api/literary-talks
// @access Public
export const createLiteraryTalk = async (req: Request, res: Response) => {
  const { error, data } = validateCreateLiteraryTalk(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: "Invalid input",
      errors: error,
    });
  }

  try {
    const literaryTalk = await prisma.literaryTalk.create({
      data: data,
    });
    return res.status(201).json({
      success: true,
      data: literaryTalk,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// @desc Update a literary talk by ID
// @route PUT /api/literary-talks/:id
// @access Public
export const updateLiteraryTalk = async (req: Request, res: Response) => {
  try {
    const id = (req as any).id;
    const { error, data } = await validateUpdateLiteraryTalk(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: "Invalid input",
        errors: error,
      });
    }

    const literaryTalk = await prisma.literaryTalk.update({
      where: {
        id: id,
      },
      data: data,
    });
    return res.status(200).json({
      success: true,
      data: literaryTalk,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
