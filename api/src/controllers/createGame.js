import { Videogames, Genres } from "../db.js";
import { Op } from "sequelize";

export const createGame = async (req, res, next) => {
  try {
    const { name, description, releaseDate, rating, platforms, genres } =
      req.body;

    if (!name || !description || !releaseDate || rating === undefined) {
      return res.status(400).json({
        error: "name, description, releaseDate and rating are required",
      });
    }

    const normalizedPlatforms = Array.isArray(platforms)
      ? platforms
      : platforms
      ? [platforms]
      : [];

    const payload = {
      name,
      description,
      releaseDate: releaseDate,
      rating,
      platforms: normalizedPlatforms,
    };

    const newGame = await Videogames.create(payload);

    if (Array.isArray(genres) && genres.length > 0) {
      const genreRecords = await Genres.findAll({
        where: { name: { [Op.in]: genres } },
      });

      if (genreRecords.length) {
        await newGame.addGenres(genreRecords);
      }
    }

    const responseGame = {
      ...newGame.toJSON(),
      genres: genres || [],
    };

    return res.status(201).json({
      msg: "Game created successfully",
      game: responseGame,
    });
  } catch (error) {
    console.error("Error creating game:", error);
    return next(error);
  }
};
