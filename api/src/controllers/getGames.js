require("dotenv").config();
const { Videogames, Genres } = require("../db");
const { API_KEY } = process.env;

//API GAMES

const URL = `https://api.rawg.io/api/games?key=${API_KEY}`;
const getUrl = (url) =>
  fetch(url)
    .then((r) => r.json())
    .then((x) => x.results);
const getGames = async () => {
  try {
    const promises = [];
    for (let i = 1; i <= 10; i++) {
      promises.push(getUrl(URL + `&page=${i}`));
    }
    let games = await Promise.all(promises).then((results) => results.flat());

    let apiGames = [];
    for (let i = 0; i < games.length; i++) {
      let game = games[i];
      apiGames.push({
        id: game.id,
        name: game.name,
        image: game.background_image,
        releaseDate: game.released,
        genres:game.genres.map((g) => ({name: g.name})),
        rating: game.metacritic,
        platforms: game.platforms.map((p) => p.platform.name),
      });
    }

    return apiGames;
  } catch (error) {
    console.log("couldn't get games" + error);
  }
};

const getGamesDb = async () => {
  try {
    let dbCreated = await Videogames.findAll({
      include: {
        model: Genres,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });
    return dbCreated;
  } catch (error) {
    return error;
  }
};

const getAllGames = async () => {
  const apiGames = await getGames();
  const dbGames = await getGamesDb();
  const allData = apiGames.concat(dbGames);
  return allData;
};

const getAll = async (req, res) => {
  let name = req.query.name;
  let games = await getAllGames();

  try {
    if (name) {
      let gameName = games.filter((g) =>
        g.name.toLowerCase().includes(name.toLowerCase())
      );

      if (gameName.length) {
        let just15 = gameName.slice(0, 15);
        const count = just15.length;
        res.status(200).send({
          count,
          just15,
        });
      } else {
        res.status(404).send("Game not found");
      }
    }
    res.status(200).send(games);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllGames, getAll, getUrl };
