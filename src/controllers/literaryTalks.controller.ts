import prisma from "../lib/prisma";
import type { Request, Response } from "express";

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
