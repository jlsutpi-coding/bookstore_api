import express, { Router } from "express";
import { validateLiteraryTalkId } from "../middlewares/literaryTalks.middleware";
import {
  createLiteraryTalk,
  deleteLiteraryTalk,
  getLiteraryTalkById,
  getLiteraryTalks,
  updateLiteraryTalk,
} from "../controllers/literaryTalks.controller";

const literaryTalksRouter: Router = express.Router();

literaryTalksRouter.get("/", getLiteraryTalks);

literaryTalksRouter.get("/:id", validateLiteraryTalkId, getLiteraryTalkById);

literaryTalksRouter.post("/", createLiteraryTalk);

literaryTalksRouter.put("/:id", validateLiteraryTalkId, updateLiteraryTalk);

literaryTalksRouter.delete("/:id", validateLiteraryTalkId, deleteLiteraryTalk);

export default literaryTalksRouter;
