const { Videogames, Genres } = require("../db");


const createGame = async (req, res,next) => {
  console.log("Entering the game creation function")
  try {
    const { name, description, releaseDate, rating, platforms, genres } = req.body;
    

    //Create the game in the database
    const newGame = await Videogames.create({
      name,
      description,
      releaseDate,
      rating,
      platforms:Array.isArray(platforms)? platforms : [platforms],
    });
console.log(newGame)

    //Search genres in DB
    if(genres&&genres.length > 0){
      const genreRecords = await Genres.findAll({
        where:{name:genres}
      });

      //Asociate found genres to the created game
      await newGame.addGenres(genreRecords);
    }


    res.status(201).json({
      msg:"Game created succesfully",
      game: newGame
    });
  } catch (error) {
    console.error("Error creating game:",error);
    next(error);
  }
};



module.exports = { createGame };
