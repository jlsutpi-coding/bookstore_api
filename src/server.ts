import express, { type Request, type Response } from "express";

import prisma from "./lib/prisma";

const app = express();

app.get("/books", async (req: Request, res: Response) => {
  try {
    const books = await prisma.book.findMany();
    console.log(books);
    res.json({
      success: true,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch books",
    });
  }
});

const port = process.env.PORT || 3000;

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
  } finally {
    await prisma.$disconnect();
  }
}

startServer();
