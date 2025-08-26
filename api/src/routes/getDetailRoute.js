import { Router } from "express";
import { getDetail } from "../controllers/getGamesDetails.js";

const router = Router();

router.get("/:id", getDetail);

export default router;
