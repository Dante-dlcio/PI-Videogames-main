import { Router } from "express";
import { getFeaturedGames } from "../controllers/getFeaturedGames.js";

const router = Router();

router.get("", getFeaturedGames);

export default router;
