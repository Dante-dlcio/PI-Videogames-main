const { Router } = require('express');
const videogamesRoute= require('./videogamesRoute')
const getGenresRoutes = require('./getGenresRoutes')
const getDetailRoutes = require('./getDetails')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();


router.use('/videogame', getDetailRoutes)
router.use('/videogames',videogamesRoute)
router.use('/genres',getGenresRoutes)




module.exports = router;
