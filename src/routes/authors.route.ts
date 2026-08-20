import express, { Router } from "express";

import { getAuthorById, getAuthors } from "../controllers/authors.controller";
import { validateAuthorId } from "../middlewares/authors.middleware";

const authorRouter: Router = express.Router();

authorRouter.get("/", getAuthors);

authorRouter.get("/:id", validateAuthorId, getAuthorById);

export default authorRouter;
