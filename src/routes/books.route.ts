import express, { Router } from "express";

import {
  createBook,
  getBookById,
  getBooks,
  searchBook,
  updateBook,
} from "../controllers/books.controller";
import { validateBookId } from "../middlewares/books.middleware";

const router: Router = express.Router();

// GET route to get all books
router.get("/", getBooks);

// GET route to search book
router.get("/search", searchBook);

// GET route to get a single book
router.get("/:id", validateBookId, getBookById);

// POST route to create a bew post
router.post("/", createBook);

// PUT route to update a book
router.put("/:id", validateBookId, updateBook);

export default router;
