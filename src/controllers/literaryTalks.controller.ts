import prisma from "../lib/prisma";

import type { NextFunction, Request, Response } from "express";

import {
  validateCreateLiteraryTalk,
  validateUpdateLiteraryTalk,
} from "../utils/literaryTalksValidator";

import { CustomError } from "../utils/CustomError";
import { handlePrismaError } from "../utils/prismaErrorHandler";

// @desc Get all literary talks
// @route GET /api/literary-talks
// @access Public
export const getLiteraryTalks = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const literaryTalks = await prisma.literaryTalk.findMany();
    return res.status(200).json({
      success: true,
      data: literaryTalks,
    });
  } catch (error) {
    return next(handlePrismaError(error));
  }
};

// @desc Get a literary talk by ID
// @route GET /api/literary-talks/:id
// @access Public
export const getLiteraryTalkById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = (req as any).id;
    const literaryTalk = await prisma.literaryTalk.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!literaryTalk) {
      return next(new CustomError("Literary talk not found", 404));
    }
    return res.status(200).json({
      success: true,
      data: literaryTalk,
    });
  } catch (error) {
    return next(handlePrismaError(error));
  }
};

// @desc Create a new literary talk
// @route POST /api/literary-talks
// @access Public
export const createLiteraryTalk = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error, data } = validateCreateLiteraryTalk(req.body);

  if (error) {
    return next(new CustomError("Bad request", 400, error));
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
    return next(handlePrismaError(error));
  }
};

// @desc Update a literary talk by ID
// @route PUT /api/literary-talks/:id
// @access Public
export const updateLiteraryTalk = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = (req as any).id;
    const { error, data } = await validateUpdateLiteraryTalk(req.body);

    if (error) {
      return next(new CustomError("Bad request", 400, error));
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
    return next(handlePrismaError(error));
  }
};

// @desc Delete a single literary talk
// @route DELETE /api/literary-talks/:id
export const deleteLiteraryTalk = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const id = (req as any).id;
  try {
    const deleteLiteraryTalk = await prisma.literaryTalk.delete({
      where: { id: id },
    });
    return res.json({
      success: true,
      data: deleteLiteraryTalk,
    });
  } catch (error) {
    return next(handlePrismaError(error));
  }
};
