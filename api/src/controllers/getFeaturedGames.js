require("dotenv").config();
const axios = require("axios");
const nodeCache = require("node-cache");
const FEATURED_CACHE = new nodeCache({ stdTLL: 86400});

const {API_KEY} = process.env;
const API_URL = `https://api.rawg.io/api/games?key=${API_KEY}&dates=2024-01-01,2025-03-01&ordering=-added`;	


const getFeaturedGames = async (req, res,next) => {
  try {
    console.log("Fetching featured games");
    //verify if the data is already in the cache
    let cachedFeatured = FEATURED_CACHE.get("featured_games")
    if(!cachedFeatured){
        console.log("Fetching from API");

    // Call the API
    let allGames = [];
    let page = 1;
    while (allGames.length <= 100){
    const response = await axios.get(`${API_URL}&page=${page}`);
    const games = response.data.results
    .map((game)=>({
        id: game.id,
        name: game.name,
        image: game.background_image,
        rating: game.rating || "Undetermined",
        genres: game.genres.map((g)=>g.name),
        platforms: game.parent_platforms.map((p)=>p.platform.name),
    }));
    allGames.push(...games);
    page++;
    };
    console.log("Fetched games", allGames.length);

    //Filter games with metacritic score > 4
    cachedFeatured = allGames.filter((game)=>game.rating>4);
    console.log("Top games", cachedFeatured.length);

    //Save the selected games in the cache
    FEATURED_CACHE.set("featured_games", cachedFeatured);
  } else{
    console.log("Serving from cache");
  }

    //shufle the games
    for (let i = cachedFeatured.length - 1; i > 0; i--){
      const j = Math.floor(Math.random()* (i+1));
      [cachedFeatured[i], cachedFeatured[j]] = [cachedFeatured[j], cachedFeatured[i]];
    }

    //select 5 random games
    const selectedGames = cachedFeatured.slice(0,5);
    console.log("Selected games", selectedGames.length);
    
    return res.json(selectedGames);
  } catch (error) {
    console.error("Error fetching featured games", error);
    next(error);
  }
};

module.exports = { getFeaturedGames };
