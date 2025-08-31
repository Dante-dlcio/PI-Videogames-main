import "dotenv/config.js";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import { Genres } from "../db.js";

const { API_KEY } = process.env;
const url = `https://api.rawg.io/api/genres?key=${API_KEY}`;

export const getGenres = async () => {
  try {
    const { data } = await axios.get(url);
    const genres = data.results.map((g) => ({
      api_id: g.id,
      id: uuidv4(),
      name: g.name,
      image: g.image_background,
    }));

    for (const genre of genres) {
      await Genres.findOrCreate({
        where: { api_id: genre.api_id },
        defaults: genre,
      });
    }
  } catch (error) {
    console.error("Error fetching genres:", error.message);
  }
};

export const getAllGenres = async (req, res) => {
  try {
    const genres = await Genres.findAll();
    return res.status(200).json(genres);
  } catch (error) {
    console.error("Error fetching genres from DB", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
