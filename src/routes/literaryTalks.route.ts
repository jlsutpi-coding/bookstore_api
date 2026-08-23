import express, { Router } from "express";
import { getLiteraryTalks } from "../controllers/literaryTalks.controller";

const literaryTalksRouter: Router = express.Router();

literaryTalksRouter.get("/", getLiteraryTalks);

export default literaryTalksRouter;
