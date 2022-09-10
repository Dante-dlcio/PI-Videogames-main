const { Router } = require('express');
const {getVideogames} = require('./controllers/getGames');
const {getGenre} = require('./controllers/getGenres');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames');
router.use('/genres');

module.exports = router;
