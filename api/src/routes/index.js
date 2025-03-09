const { Router } = require('express');
const getVideogamesRoute= require('./getVideogamesRoute')
const getGenresRoute = require('./getGenresRoute')
const getDetailRoute = require('./getDetailRoute')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


router.use('/videogames',getVideogamesRoute)
router.use('/genres',getGenresRoute)
router.use('/videogame', getDetailRoute)




module.exports = router;
