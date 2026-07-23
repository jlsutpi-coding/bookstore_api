import express, { Router } from "express";

import {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
} from "../controllers/books.controller";
import { validateBookId } from "../middlewares/books.middleware";

const boooksRouter: Router = express.Router();

// GET route to get all books
boooksRouter.get("/", getBooks);

// GET route to search book
// boooksRouter.get("/search", searchBook);

// GET route to get a single book
boooksRouter.get("/:id", validateBookId, getBookById);

// POST route to create a bew post
boooksRouter.post("/", createBook);

// PUT route to update a book
// boooksRouter.put("/:id", validateBookId, updateBook);

// DELETE route to delete a single book
boooksRouter.delete("/:id", validateBookId, deleteBook);

export default boooksRouter;
