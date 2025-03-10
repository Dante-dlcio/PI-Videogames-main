require("dotenv").config();
const axios = require("axios");
const { Videogames, Genres } = require("../db");
const { API_KEY } = process.env;

// GAMES

const URL = `https://api.rawg.io/api/games?key=${API_KEY}`;
let cachedGames = null;
let lastFetch = 0;
const CACHE_TIME = 1000 * 60 * 10;

const getGames = async () => {
  try {
    const now = Date.now();
    if (cachedGames && now - lastFetch < CACHE_TIME) {
      return cachedGames;
    }
    const promises = Array.from({ length: 10 }, (_, i) =>
      axios.get(`${URL}&page=${i + 1}`)
    );

    const results = await Promise.all(promises);
    let games = results.flatMap((res) => res.data.results);

    cachedGames = games.map((game) => ({
      id: game.id,
      name: game.name,
      image: game.background_image,
      releaseDate: game.released,
      genres: game.genres.map((g) => ({ name: g.name })),
      rating: game.rating|| "Undetermined",
      metacritic: game.metacritic||"Undetermined",
      platforms: game.platforms.map((p) => p.platform.name),
    }));
    lastFetch = Date.now();
    return cachedGames;
  } catch (error) {
    console.error("Couldn't fetch Games:", error);
    return [];
  }
};

const getGamesDb = async () => {
  try {
    return await Videogames.findAll({
      include: {
        model: Genres,
        attributes: ["name"],
        trough: { attributes: [] },
      },
    });
  } catch (error) {
    console.log("Error fetching games from DB", error);
    return [];
  }
};

const getAllGames = async () => {
  const [apiGames, dbGames] = await Promise.all([getGames(), getGamesDb()]);
  return [...apiGames, ...dbGames];
};

const getAll = async (req, res) => {
  try {
    const { name, page = 1, limit = 15 } = req.query;
    let games = await getAllGames();

    if (name) {
      games = games.filter((g) =>
        g.name.toLowerCase().includes(name.toLowerCase())
      );
    }

    const total = games.length;
    const totalPages = Math.ceil(total/limit);
    const currentPage= Math.min(Math.max(Number(page),1), totalPages)
    const start = (currentPage -1)*limit;
    const paginatedGames = games.slice(start, start + limit);

    res.status(200).json({
      total,
      page: currentPage,
      totalPages,
      limit: Number(limit),
      games: paginatedGames.length> 0 ? paginatedGames : "No games found",
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { getGames,getAllGames, getAll };
