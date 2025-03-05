const axios = require("axios");
const { Genres } = require("../db");
const { API_KEY } = process.env;
const { v4: uuidv4 } = require("uuid");

const url = `https://api.rawg.io/api/genres?key=${API_KEY}`;

//get Genres if it doesn't exist
const getGenres = async () => {
  try {
    const { data } = await axios.get(url);
    const genres = data.results.map((g) => ({
      api_id: g.id,
      id: uuidv4(),
      name: g.name,
      image: g.image_background,
    }));

    //avoid duplicates verifying if there are genres in DB
    for (const genre of genres) {
      await Genres.findOrCreate({
        where: { api_id: genre.api_id },
        defaults: genre,
      });
    }

    console.log("Genres updated successfully");
  } catch (error) {
    console.error("Error fetching genres:", error.message);
  }
};

//function to get all genres from DB
const getAllGenres = async (req, res) => {
  try {
    const genres = await Genres.findAll();
    res.status(200).json(genres);
  } catch (error) {
    console.error("Error fetching genres from DB", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports = { getGenres, getAllGenres };
