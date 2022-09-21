const { Router } = require('express');
const {getGames} = require('../controllers/getGames');
const {getGenres} = require('../controllers/getGenres');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

router.use('/videogames', getGames)

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// router.use('/videogames');
// router.use('/genres');

module.exports = router;
