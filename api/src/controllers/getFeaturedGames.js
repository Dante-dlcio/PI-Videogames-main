import "dotenv/config.js";
import axios from "axios";
import NodeCache from "node-cache";
import { mapGenres, mapPlatforms, CACHE_TIMES } from "../utils/index.js";

const FEATURED_CACHE = new NodeCache({ stdTTL: 86400 });

const { API_KEY } = process.env;
const API_URL = `https://api.rawg.io/api/games?key=${API_KEY}&dates=2024-01-01,2025-03-01&ordering=-added`;

const FEATURED_GAMES_LIMIT = 100;

export const getFeaturedGames = async (req, res, next) => {
  try {
    let cachedFeatured = FEATURED_CACHE.get("featured_games");
    if (!cachedFeatured) {
      const allGames = [];
      let page = 1;
      while (allGames.length <= FEATURED_GAMES_LIMIT) {
        const response = await axios.get(`${API_URL}&page=${page}`);
        const games = response.data.results.map((game) => ({
          id: game.id,
          name: game.name,
          image: game.background_image,
          rating: game.rating ?? "Undetermined",
          genres: mapGenres(game.genres),
          platforms: mapPlatforms([], game.parent_platforms),
        }));
        allGames.push(...games);
        page++;
      }

      cachedFeatured = allGames.filter((game) => Number(game.rating) > 4);

      FEATURED_CACHE.set("featured_games", cachedFeatured);
    }

    for (let i = cachedFeatured.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cachedFeatured[i], cachedFeatured[j]] = [
        cachedFeatured[j],
        cachedFeatured[i],
      ];
    }

    const selectedGames = cachedFeatured.slice(0, 5);

    return res.json(selectedGames);
  } catch (error) {
    console.error("Error fetching featured games", error);
    return next(error);
  }
};
