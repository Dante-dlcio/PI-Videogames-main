const{ Router } = require('express');
const router = require('.');
const{getGames } = require('../controllers/getGamesAPI&DB')
const{ } = require()
const{ } = require()
const{ } = require()

router.get('', async (req,res) =>{
    let allGames = await getGames()
        try {
            let allGames = await getGames()
            res.status(200).send(allGames)
        } catch (error) {
            console.log('Error en getGames'+ error)
            
        }
    })