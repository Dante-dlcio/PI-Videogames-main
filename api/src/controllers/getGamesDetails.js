require("dotenv").config;
const axios = require("axios");
const { API_KEY } = process.env;
const { Videogames, Genres } = require('../db')
const uuid = require('uuid')

const gameDetailApi = async (id) => {
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
      image: response.data.background_image,
      backgroundImage: response.data.background_image_additional,
    };
    return result;
  } catch (err) {
    console.log("error catching details", err);
  }
};

const gameDetailDb = async (id) => {
  let detailedDb = await Videogames.findAll({
    where : {id:id},
    include: {
      model: Genres,
      attributes: ["name",],
      through: {
        attributes: [],
      }
    }
  })
  let result = {
      id: detailedDb[0].id,
      name: detailedDb[0].name,
      releaseDate: detailedDb[0].releaseDate,
      rating: detailedDb[0].rating,
      platforms: detailedDb[0].platforms.split(','),
      genres: detailedDb[0].genres.map((g) => g.name),
      description: detailedDb[0].description,
  }
  return result
}


const getDetail = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    if(uuid.validate(id)){
      let response = await gameDetailDb(id)
      res.status(200).send(response);
    }else{
      let response = await gameDetailApi(id);
      res.status(200).send(response);
    }
  } catch (error) {
    res.status(404).send(error);
  }
};

module.exports = { getDetail };