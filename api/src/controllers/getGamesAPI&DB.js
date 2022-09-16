require('dotenv').config();
const axios = require('axios');
const { Videogame } = require('../db');
const {API_KEY} = process.env;

//GAMES FROM API

//save the url and API key in a variable
const url = `https://api.rawg.io/api/games?$key=${API_KEY}`
//save function getUrl, to fetch the data and position itself in the api results
const getUrl = (url) => fetch(url).then(r=> r.json()).then(x=>x.results)
//start with the getGames function
const getGames = async () => {
    try{
        //declare array to push promises and resolve with Promise.all
        let promises = []
        //iterate 4 pages (25games each) with a 4loop and push it to the array
        for (let i = 1; i <= 4 ; i++) {
            promises.push(url+`&pages${i}`)
        }
        //save games and resolve the promise all and then flat the result
        let allGames=await Promise.all(promises).then(results => results.flat())

        let juegosFormateados = []
        for(let i = 0; i<juegos.length; i++){
            let juegos = juegos[i]
            juegosFormateados.push({
                id: juego.id,
                name: juego.name,
                image: juego.background_image,
                release: juego.relesed,
                rating: juego.rating,
                platforms: juego.platforms.map((p)=> p.platform.name)
            })
        }
        return juegosFormateados

     }catch(error){
      console.log("couldn't get games")
   }
  }
    
module.exports = { getGames };