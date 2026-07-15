import type { Request, Response } from "express";

import prisma from "../lib/prisma";

import type { CreateOrderInput } from "../types/orders.types";
import { validatedOrderPayload } from "../utils/ordersValidator";

// @desc Get orders
// @route GET /api/orders
export const getOrders = async (req: Request, res: Response) => {
  try {
    const orders = await prisma.order.findMany();
    return res.json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.error("Orders fetching error: ", error);
    return res.status(500).json({
      success: false,
      error: "Someting went wrong.",
    });
  }
};

// @desc Post orders
// @route POST /api/orders
export const postOrders = async (
  req: Request<{}, {}, CreateOrderInput>,
  res: Response,
) => {
  try {
    const { error, data } = await validatedOrderPayload(req.body);

    if (error || !data) {
      return res.status(400).json({ success: false, error });
    }
    const newOrder = await prisma.order.create({
      data: {
        status: "pending",
        ...data,
      },
    });
    return res.status(201).json({
      success: true,
      data: newOrder,
    });
  } catch (error) {
    console.error("Order creation error:", error);
    return res.status(500).json({
      success: false,
      error: "Something went wrong",
    });
  }
};
