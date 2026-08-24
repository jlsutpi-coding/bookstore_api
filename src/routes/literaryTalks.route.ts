import express, { Router } from "express";
import {
  getLiteraryTalkById,
  getLiteraryTalks,
} from "../controllers/literaryTalks.controller";
import { validateLiteraryTalkId } from "../middlewares/literaryTalks.middleware";

const literaryTalksRouter: Router = express.Router();

literaryTalksRouter.get("/", getLiteraryTalks);

literaryTalksRouter.get("/:id", validateLiteraryTalkId, getLiteraryTalkById);

export default literaryTalksRouter;
