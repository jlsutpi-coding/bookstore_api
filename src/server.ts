import express from "express";

import prisma from "./lib/prisma";
import bookRoutes from "./routes/books.route";
import ordersRouter from "./routes/orders.route";
import authorRouter from "./routes/authors.route";
import literaryTalksRouter from "./routes/literaryTalks.route";

const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());

app.use("/api/books", bookRoutes);

app.use("/api/orders", ordersRouter);

app.use("/api/authors", authorRouter);

app.use("/api/literary-talks", literaryTalksRouter);

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
