const{ Router } = require('express');
const {createGame} = require('../controllers/createGame')
const {getAll} = require('../controllers/getGames')
const router = Router();



router.post('/createGame',createGame)
router.get('', getAll)


module.exports = router
