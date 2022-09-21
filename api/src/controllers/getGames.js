require('dotenv').config();
const { Videogames } = require('../db');
const {API_KEY} = process.env;

//GAMES FROM API

//save the url and API key in a variable
const URL = `https://api.rawg.io/api/games?key=${API_KEY}`
//save function getUrl, to fetch the data and position itself in the api results
const getUrl = (url) => fetch(url).then(r=> r.json()).then(x=>x.results)
//start with the getGames function
const getGames = async () => {
    try{
       const promises = []
  for(let i=1; i<=4; i++){
       promises.push(getUrl(URL+`&page=${i}`))
  }
  let games = await Promise.all(promises).then(results => results.flat())
	console.log()
  // console.log(juegos)
  let apiGames = []
  for(let i=0; i<games.length; i++){
   let game = games[i]
   apiGames.push({
        id: game.id,
        name:game.name,
        image:game.background_image,
        release: game.released,
        rating: game.rating,
        plataforms:game.platforms.map((p)=>p.platform.name)
  	})
            
        }
       console.log(apiGames)

        return apiGames
     
     }catch(error){
      console.log("couldn't get games" + error)
   }
  }

  const getGamesDb = async()=>{
   return await Videogames

  }


   // traer juegos de base de datos y concatenarlos a getGames 
module.exports = { getGames };