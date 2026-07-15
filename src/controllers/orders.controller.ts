import type { Request, Response } from "express";

import prisma from "../lib/prisma";

import type { CreateOrderInput } from "../types/orders.types";
import { validatedOrderPayload } from "../utils/ordersValidator";

// @desc Post order
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
