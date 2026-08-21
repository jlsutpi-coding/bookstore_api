import express, { Router } from "express";

import {
  createAuthor,
  deleteAuthor,
  getAuthorById,
  getAuthors,
  updateAuthor,
} from "../controllers/authors.controller";
import { validateAuthorId } from "../middlewares/authors.middleware";

const authorRouter: Router = express.Router();

authorRouter.get("/", getAuthors);

authorRouter.get("/:id", validateAuthorId, getAuthorById);

authorRouter.post("/", createAuthor);

authorRouter.put("/:id", validateAuthorId, updateAuthor);

authorRouter.delete("/:id", validateAuthorId, deleteAuthor);

export default authorRouter;
