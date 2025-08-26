import "dotenv/config.js";
import axios from "axios";
import NodeCache from "node-cache";
import { mapGenres, mapPlatforms, CACHE_TIMES } from "../utils/index.js";

// Cache por 24h
const FEATURED_CACHE = new NodeCache({ stdTTL: 86400 });

const { API_KEY } = process.env;
const API_URL = `https://api.rawg.io/api/games?key=${API_KEY}&dates=2024-01-01,2025-03-01&ordering=-added`;

const FEATURED_GAMES_LIMIT = 100;

export const getFeaturedGames = async (req, res, next) => {
  try {
    console.log("Fetching featured games");

    // Verificar si ya tenemos cache
    let cachedFeatured = FEATURED_CACHE.get("featured_games");
    if (!cachedFeatured) {
      console.log("Fetching from API");

      // Llamada a la API (paginada)
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
      console.log("Fetched games", allGames.length);

      // Filtrar por rating > 4
      cachedFeatured = allGames.filter((game) => Number(game.rating) > 4);
      console.log("Top games", cachedFeatured.length);

      // Guardar en cache
      FEATURED_CACHE.set("featured_games", cachedFeatured);
    } else {
      console.log("Serving from cache");
    }

    // Mezclar aleatoriamente (Fisher–Yates)
    for (let i = cachedFeatured.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cachedFeatured[i], cachedFeatured[j]] = [
        cachedFeatured[j],
        cachedFeatured[i],
      ];
    }

    // Seleccionar 5 aleatorios
    const selectedGames = cachedFeatured.slice(0, 5);
    console.log("Selected games", selectedGames.length);

    return res.json(selectedGames);
  } catch (error) {
    console.error("Error fetching featured games", error);
    return next(error);
  }
};
