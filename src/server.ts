import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";

import prisma from "./lib/prisma";
import bookRoutes from "./routes/books.route";
import ordersRouter from "./routes/orders.route";
import authorRouter from "./routes/authors.route";
import literaryTalksRouter from "./routes/literaryTalks.route";
import errorHandler from "./middlewares/error";
import { CustomError } from "./utils/CustomError";
import { notFound } from "./middlewares/notFound";

const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());

// book route
app.use("/api/books", bookRoutes);

// order route
app.use("/api/orders", ordersRouter);

// author route
app.use("/api/authors", authorRouter);

// literary talks route
app.use("/api/literary-talks", literaryTalksRouter);

// Error handler
app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await prisma.$connect();
    console.log("✅ Database connection successful!");
    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    process.exit(1);
  }
};

startServer();
