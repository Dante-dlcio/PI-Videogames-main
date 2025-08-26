import { Router } from "express";
import { getAllGenres, getGenres } from "../controllers/getGenres.js";

const router = Router();

// First populate DB, then get all genres
router.get("", async (req, res, next) => {
  try {
    // First fetch and populate genres from API
    await getGenres();
    // Then get all genres from DB
    await getAllGenres(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
