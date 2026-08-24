import express, { Router } from "express";
import { validateLiteraryTalkId } from "../middlewares/literaryTalks.middleware";
import {
  createLiteraryTalk,
  getLiteraryTalkById,
  getLiteraryTalks,
} from "../controllers/literaryTalks.controller";

const literaryTalksRouter: Router = express.Router();

literaryTalksRouter.get("/", getLiteraryTalks);

literaryTalksRouter.get("/:id", validateLiteraryTalkId, getLiteraryTalkById);

literaryTalksRouter.post("/", createLiteraryTalk);

export default literaryTalksRouter;
