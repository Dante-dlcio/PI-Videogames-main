const{ Router } = require('express');
const {getAllGenres} = require('../controllers/getGenres')
const router = Router();

 const {Videogames, Genres} = ('../db.js');

 router.get('',getAllGenres)


module.exports = router
