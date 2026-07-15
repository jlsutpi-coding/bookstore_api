import express from "express";
import type { Router } from "express";
import { postOrders } from "../controllers/orders.controller";

const ordersRouter: Router = express.Router();

ordersRouter.post("/", postOrders);

export default ordersRouter;
