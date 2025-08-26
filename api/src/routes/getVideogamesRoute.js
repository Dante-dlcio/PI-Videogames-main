import { Router } from "express";
import { createGame } from "../controllers/createGame.js";
import { getAll } from "../controllers/getGames.js";

const router = Router();

router.post("/createGame", createGame);
router.get("", getAll);

export default router;
