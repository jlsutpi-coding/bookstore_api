import express from "express";
import type { Router } from "express";
import { getOrders, postOrders } from "../controllers/orders.controller";

const ordersRouter: Router = express.Router();

ordersRouter.post("/", postOrders);

ordersRouter.get("/", getOrders);

export default ordersRouter;
