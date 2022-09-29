const { Videogames, Genres } = require("../db");

const createGame = async (req, res) => {
  try {
    const { name, description, releaseDate, rating, platforms, created, genres } =
      req.body;
    let results = await Videogames.create({
      name,
      description,
      releaseDate,
      rating,
      platforms,
      created,
    });
    genres.forEach(async (genre) => {

      let genreId = await Genres.findAll({ where: { name: genre } }); 
      results.addGenres(genreId);

    })
    res.send({
      msg: "Game created",
      results
    });
  } catch (error) {
    console.log(error);
    res.status(404).send("couldn't find genres")
  }
};



module.exports = { createGame };
