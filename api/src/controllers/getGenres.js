const axios = require("axios");
const { Genres } = require("../db");
const { API_KEY } = process.env;
const { v4: uuidv4 } = require("uuid");

const url = `https://api.rawg.io/api/genres?key=${API_KEY}`;

const getGenres = async () => {
  const genres = (await axios.get(url)).data.results.map((g) => ({
    apiId: g.id,
    id: uuidv4(),
    name: g.name,
    image: g.image_background,
  }));
  await Genres.bulkCreate(genres);
  console.log("created genres");
};

const getAllGenres = (req, res) => {
  Genres.findAll()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(404).send(err);
    });
};
module.exports = { getGenres, getAllGenres }; 
