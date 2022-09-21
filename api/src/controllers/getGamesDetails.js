require('dotenv').config
const axios = require('axios')


const getGameDetail =  (idNum) => { 
    let url = `https://api.rawg.io/api/games/${idNum}?key=${API_KEY} `
    axios.get(url).then((res) => {
      let resp = res.data
      return {
        'id' : resp.id,
        'name': resp.name,
        'release': resp.released,
        'rating': resp.rating,
        'plataforms' : resp.parent_platforms.map((p) => p.platform.name),
        'genres' : resp.genres.map((g)=>g.name),
        'description': resp.description_raw
        }
      
    }).catch((err)=>{
      console.log("error catching details", err)
    })
  }
 
  

  module.exports = {getGameDetail}