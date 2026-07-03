import express, { type Request, type Response } from "express";

import prisma from "./lib/prisma";
import bookRoutes from "./routes/books.route";

const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());

app.use("/books", bookRoutes);

async function startServer() {
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
}

startServer();
