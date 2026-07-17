import type { Request, Response } from "express";

import prisma from "../lib/prisma";

import {
  validateCreateOrder,
  validateUpdateOrder,
} from "../utils/ordersValidator";

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
export const postOrders = async (req: Request, res: Response) => {
  try {
    const { error, data } = await validateCreateOrder(req.body);

    if (error || !data) {
      return res.status(400).json({ success: false, error });
    }
    const newOrder = await prisma.order.create({
      data,
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

// @desc Put orders
// @route PUT /api/orders
export const putOrders = async (
  req: Request<{ orderId: string }, {}, {}>,
  res: Response,
) => {
  const id = (req as any).orderIdNumber;

  try {
    const { error, data } = await validateUpdateOrder(req.body);

    if (error || !data) {
      return res.status(400).json({ success: false, error });
    }
    const updateData = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== undefined),
    );
    const updatedOrder = await prisma.order.update({
      where: { id: id },
      data: updateData,
    });
    return res.json({
      success: true,
      data: updatedOrder,
    });
  } catch (error: any) {
    console.error("Error updating order: ", error);
    if (error.code === "P2025") {
      return res.status(404).json({
        success: false,
        error: "Order not found.",
      });
    }

    return res.status(500).json({
      success: false,
      error: "Failed to update order.",
    });
  }
};
