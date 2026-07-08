import express, { Router } from "express";

import {
  createBook,
  getBookById,
  getBooks,
} from "../controllers/books.controller";

const router: Router = express.Router();

// GET route to get all books
router.get("/", getBooks);

// GET route to get a single book
router.get("/:id", getBookById);

// POST route to create a bew post
router.post("/", createBook);

export default router;
