require('dotenv').config();
const axios = require('axios');
const { Videogame } = require('../db');
const {API_KEY} = process.env;


const getAllGames = async () => {
    let promises = [];
    for(let i = 1; i<=5; i++){
        const games = axios.get(
            `https://api.rawg.io/api/games?${API_KEY}?page${i}`
        );
        promises.push(games)
    }
    return await Promise.all(promises)
    .then((responses)=>{
        let pages = responses.map(r=> r?.data?.results)
        let result = pages.filter((x)=> x != null).flat().map((g)=>{
            return{
                id: g.id,
                name: g.id
            }
        })
        return result;
    })
}
