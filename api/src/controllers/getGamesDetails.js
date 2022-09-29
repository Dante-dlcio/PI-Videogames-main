require("dotenv").config;
const axios = require("axios");
const { API_KEY } = process.env;

const gameDetail = async (id) => {
  let url = `https://api.rawg.io/api/games/${id}?key=${API_KEY} `;
  try {
    let response = await axios.get(url);
    let result = {
      id: response.data.id,
      name: response.data.name,
      releaseDate: response.data.released,
      rating: response.data.rating,
      platforms: response.data.parent_platforms.map((p) => p.platform.name),
      genres: response.data.genres.map((g) => g.name),
      description: response.data.description_raw,
    };
    return result;
  } catch (err) {
    console.log("error catching details", err);
  }
};

const getDetail = async (req, res) => {
  try {
    const { id } = req.params;
    let response = await gameDetail(id);
    res.status(200).send(response);
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = { getDetail };