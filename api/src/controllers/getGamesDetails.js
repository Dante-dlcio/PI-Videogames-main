require("dotenv").config();
const { validate: isUUID } = require("uuid");
const axios = require("axios");
const { Videogames, Genres } = require("../db");
const { htmlToText } = require("html-to-text");
const { API_KEY } = process.env;

const URL = `https://api.rawg.io/api/games`;

//memory cache
const gameCache ={};
const CACHE_TIME = 1000 * 60 * 10

const cleanDescription = (html) => {
  if (!html) return "No description available";

  // Convert HTML to plain text
  let text = htmlToText(html, { wordwrap: false });

  // Normalize line breaks
  text = text.replace(/\n\n/g, " ").replace(/\n/g, ". ");

  //divide text in english and spanish
  let [englishPart, spanishPart] = text.split(" Español.");

  return {
    english: englishPart ? englishPart.trim() : "No English description available.",
    spanish: spanishPart ? spanishPart.trim() : "No Spanish description available.",
  };
};

const getGameDetail = async (id) => {
  try {
    const now = Date.now();
    if(gameCache[id]&&now-gameCache[id].timestamp>CACHE_TIME){
      return gameCache[id].data;
    }
    //uuid validation for Db
    //search in database
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
          genres: gameFromDb.Genres.map((g) => g.name),
          platforms: gameFromDb.platforms || ["Unknown"],
          backgroundImage: gameFromDb.backgroundImage || gameFromDb.image,
        };
        //Saving in cache
        gameCache[id] = {data:gameData, timestamp:now};
        return gameData
      }
    }

    //Search in API
    const { data: gameData } = await axios.get(`${URL}/${id}?key=${API_KEY}`);
    const fromattedGame = {
      id: gameData.id,
      name: gameData.name,
      description: cleanDescription(gameData.description),
      image: gameData.background_image,
      releaseDate: gameData.released,
      rating: gameData.rating || "Undetermined.",
      metacritic: gameData.metacritic || "Undetermined.",
      genres: gameData.genres.map((g) => g.name),
      platforms: gameData.parent_platforms
        ? gameData.parent_platforms.map((p) => p.platform.name)
        : gameData.platforms
        ? gameData.platforms.map((p) => p.platform.name)
        : ["Unknown"],
      website: gameData.website || "No website available.",
      backgroundImage:
        gameData.background_image_additional || gameData.background_image,
    };

    //Saving in cache
    gameCache[id] = {data: fromattedGame, timestamp:now}

    return fromattedGame
  } catch (error) {
    console.error("Error fetching game details:", error.message);
    return null;
  }
};

const getDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const gameDetail = await getGameDetail(id);

    if (!gameDetail) {
      return res.status(404).json({ message: "Game not found" });
    }
    res.json(gameDetail);
  } catch (error) {
    console.error("Error in getDetails:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { getDetail };
