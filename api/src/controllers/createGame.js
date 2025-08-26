import { Videogames, Genres } from "../db.js";
import { Op } from "sequelize";

export const createGame = async (req, res, next) => {
  try {
    const {
      name,
      description,
      releaseDate, // expected in ISO yyyy-mm-dd
      rating,
      platforms,
      genres,
    } = req.body;

    // Basic required validation (you can adapt messages as needed)
    if (!name || !description || !releaseDate || rating === undefined) {
      return res.status(400).json({
        error: "name, description, releaseDate and rating are required",
      });
    }

    // Normalize platforms to an array (DB expects ARRAY(VARCHAR))
    const normalizedPlatforms = Array.isArray(platforms)
      ? platforms
      : platforms
      ? [platforms]
      : [];

    // Align to DB attribute naming: release_date (underscored)
    const payload = {
      name,
      description,
      releaseDate: releaseDate,
      rating,
      platforms: normalizedPlatforms,
    };

    // Create the game
    const newGame = await Videogames.create(payload);

    // Attach genres if provided
    if (Array.isArray(genres) && genres.length > 0) {
      const genreRecords = await Genres.findAll({
        where: { name: { [Op.in]: genres } },
      });

      if (genreRecords.length) {
        await newGame.addGenres(genreRecords);
      }
    }

    // 🔧 SIMPLE FIX: Manually add genres to the response
    const responseGame = {
      ...newGame.toJSON(), // Convert to plain object
      genres: genres || [], // Add the genres array
    };

    return res.status(201).json({
      msg: "Game created successfully",
      game: responseGame, // Use the enhanced response object
    });
  } catch (error) {
    console.error("Error creating game:", error);
    return next(error);
  }
};
