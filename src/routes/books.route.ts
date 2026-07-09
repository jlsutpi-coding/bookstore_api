import express, { Router } from "express";

import {
  createBook,
  getBookById,
  getBooks,
  updateBook,
} from "../controllers/books.controller";

const router: Router = express.Router();

// GET route to get all books
router.get("/", getBooks);

// GET route to get a single book
router.get("/:id", getBookById);

// POST route to create a bew post
router.post("/", createBook);

// PUT route to update a book
router.put("/:id", updateBook);

export default router;
