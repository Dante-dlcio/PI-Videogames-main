import "dotenv/config.js";
import axios from "axios";
import { Videogames, Genres } from "../db.js";
import { mapGenres, mapPlatforms, CACHE_TIMES } from "../utils/index.js";

const { API_KEY } = process.env;

// GAMES
const URL = `https://api.rawg.io/api/games?key=${API_KEY}`;
let cachedGames = null;
let lastFetch = 0;
const CACHE_TIME = CACHE_TIMES.GAMES;

export const getGames = async () => {
  try {
    const now = Date.now();
    if (cachedGames && now - lastFetch < CACHE_TIME) {
      return cachedGames;
    }

    const API_PAGES_LIMIT = 10;
    const promises = Array.from({ length: API_PAGES_LIMIT }, (_, i) =>
      axios.get(`${URL}&page=${i + 1}`)
    );

    const results = await Promise.all(promises);
    const games = results.flatMap((res) => res.data.results);

    cachedGames = games.map((game) => ({
      id: game.id,
      name: game.name,
      image: game.background_image,
      releaseDate: game.released,
      genres: mapGenres(game.genres, true),
      rating: game.rating ?? "Undetermined",
      metacritic: game.metacritic ?? "Undetermined",
      platforms: mapPlatforms(game.platforms),
    }));
    lastFetch = Date.now();
    return cachedGames;
  } catch (error) {
    console.error("Couldn't fetch Games:", error);
    return [];
  }
};

export const getGamesDb = async () => {
  try {
    return await Videogames.findAll({
      include: {
        model: Genres,
        attributes: ["name"],
        through: { attributes: [] }, // fixed typo: 'trough' -> 'through'
      },
    });
  } catch (error) {
    console.error("Error fetching games from DB", error);
    return [];
  }
};

export const getAllGames = async () => {
  const [apiGames, dbGames] = await Promise.all([getGames(), getGamesDb()]);
  return [...apiGames, ...dbGames];
};

export const getAll = async (req, res) => {
  try {
    const { name, page = 1, limit = 15 } = req.query;
    let games = await getAllGames();

    if (name) {
      const query = String(name).toLowerCase();
      games = games.filter((g) => g.name.toLowerCase().includes(query));
    }

    const total = games.length;
    const totalPages = Math.max(1, Math.ceil(total / Number(limit)));
    const currentPage = Math.min(Math.max(Number(page), 1), totalPages);
    const start = (currentPage - 1) * Number(limit);
    const paginatedGames = games.slice(start, start + Number(limit));

    res.status(200).json({
      total,
      page: currentPage,
      totalPages,
      limit: Number(limit),
      games: paginatedGames.length > 0 ? paginatedGames : "No games found",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
