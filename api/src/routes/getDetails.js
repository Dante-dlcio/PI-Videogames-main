const{ Router } = require('express');
const {getDetail} = require('../controllers/getGamesDetails')
const router = Router();


 router.get('/:id',getDetail)


module.exports = router