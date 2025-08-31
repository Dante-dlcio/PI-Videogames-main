import "dotenv/config.js";
import axios from "axios";
import { validate as isUUID } from "uuid";
import { htmlToText } from "html-to-text";
import { Videogames, Genres } from "../db.js";
import { mapGenres, mapPlatforms, CACHE_TIMES } from "../utils/index.js";

const { API_KEY } = process.env;
const URL = `https://api.rawg.io/api/games`;

const gameCache = {};
const CACHE_TIME = CACHE_TIMES.GAME_DETAIL;

const cleanDescription = (html) => {
  if (!html) return "No description available";

  let text = htmlToText(html, { wordwrap: false });
  text = text.replace(/\n\n/g, " ").replace(/\n/g, ". ");
  const [englishPart, spanishPart] = text.split(" Español.");

  return {
    english: englishPart
      ? englishPart.trim()
      : "No English description available.",
    spanish: spanishPart
      ? spanishPart.trim()
      : "No Spanish description available.",
  };
};

export const getGameDetail = async (id) => {
  try {
    const now = Date.now();
    if (gameCache[id] && now - gameCache[id].timestamp < CACHE_TIME) {
      return gameCache[id].data;
    }

    if (isUUID(id)) {
      const gameFromDb = await Videogames.findOne({
        where: { id },
        include: {
          model: Genres,
          attributes: ["name"],
          through: { attributes: [] },
        },
      });

      if (gameFromDb) {
        const gameData = {
          id: gameFromDb.id,
          name: gameFromDb.name,
          description: gameFromDb.description || "No description available.",
          image: gameFromDb.image,
          releaseDate: gameFromDb.releaseDate,
          rating: gameFromDb.rating || "Undetermined.",
          genres: mapGenres(gameFromDb.Genres || []),
          platforms: gameFromDb.platforms || ["Unknown"],
          backgroundImage: gameFromDb.backgroundImage || gameFromDb.image,
        };
        gameCache[id] = { data: gameData, timestamp: now };
        return gameData;
      }
    }

    const { data: gameData } = await axios.get(`${URL}/${id}?key=${API_KEY}`);
    const formattedGame = {
      id: gameData.id,
      name: gameData.name,
      description: cleanDescription(gameData.description),
      image: gameData.background_image,
      releaseDate: gameData.released,
      rating: gameData.rating || "Undetermined.",
      metacritic: gameData.metacritic || "Undetermined.",
      genres: mapGenres(gameData.genres),
      platforms: mapPlatforms(gameData.platforms, gameData.parent_platforms),
      website: gameData.website || "No website available.",
      backgroundImage:
        gameData.background_image_additional || gameData.background_image,
    };

    gameCache[id] = { data: formattedGame, timestamp: now };
    return formattedGame;
  } catch (error) {
    console.error("Error fetching game details:", error.message);
    return null;
  }
};

export const getDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const gameDetail = await getGameDetail(id);

    if (!gameDetail) {
      return res.status(404).json({ message: "Game not found" });
    }
    return res.json(gameDetail);
  } catch (error) {
    console.error("Error in getDetails:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
