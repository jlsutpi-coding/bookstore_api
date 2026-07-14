import express from "express";
import type { Request, Response, Router } from "express";

const ordersRouter: Router = express.Router();

ordersRouter.post("/", (req: Request, res: Response) => {
  return res.json({
    success: true,
    message: "Post route in orders",
  });
});

export default ordersRouter;
