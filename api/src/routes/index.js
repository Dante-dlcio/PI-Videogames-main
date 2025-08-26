import { Router } from "express";
import getVideogamesRoute from "./getVideogamesRoute.js";
import getGenresRoute from "./getGenresRoute.js";
import getDetailRoute from "./getDetailRoute.js";
import getFeaturedGamesRoute from "./getFeaturedGamesRoute.js";

const router = Router();

router.use("/videogames", getVideogamesRoute);
router.use("/genres", getGenresRoute);
router.use("/videogame", getDetailRoute);
router.use("/featured", getFeaturedGamesRoute);

export default router;
