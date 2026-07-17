import express from "express";
import type { Router } from "express";
import {
  getOrders,
  postOrders,
  putOrders,
} from "../controllers/orders.controller";
import { validateOrderId } from "../middlewares/orders.middleware";

const ordersRouter: Router = express.Router();

ordersRouter.post("/", postOrders);

ordersRouter.get("/", getOrders);

ordersRouter.put("/:orderId", validateOrderId, putOrders);

export default ordersRouter;
