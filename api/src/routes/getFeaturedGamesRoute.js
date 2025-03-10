const {Router} = require('express');
const {getFeaturedGames} = require('../controllers/getFeaturedGames');

const router = Router();

router.get('/', getFeaturedGames);

module.exports = router;