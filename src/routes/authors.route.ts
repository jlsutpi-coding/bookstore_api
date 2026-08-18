import express, { Router } from "express";

import { getAuthors } from "../controllers/authors.controller";

const authorRouter: Router = express.Router();

authorRouter.get("/", getAuthors);

export default authorRouter;
