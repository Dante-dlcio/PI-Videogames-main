const { Router } = require('express');
const {getGames} = require('../controllers/getGamesAPI&DB');
const {getGenre} = require('../controllers/getGenresAPI&DB');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use('/videogames', getGames)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use('/videogames');
// router.use('/genres');

module.exports = router;
