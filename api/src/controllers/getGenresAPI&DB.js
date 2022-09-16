const axios = require('axios');
const {Genre} = require('../db');
const API_KEY = process.env;

    const url = `https://api.rawg.io/api/genres?key=${API_KEY}`

    const getGenres = async()=>{
        if(!(await getGenres.findAll().length)){
             const genres = (await axios.get(url)).data.results.map((g)=>({
                    id: g.id,
                    name: g.name,
                    image: g.image_background
                    }))
                    console.log(genres)
            await Genre.bulkCreate(genres);
            console.log('episodios creados')
        }else{
            console.log('ya se cargaron los episodios')
        }
    }
    module.exports = {getGenres}