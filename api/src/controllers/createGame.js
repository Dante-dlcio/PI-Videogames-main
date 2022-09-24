const {Videogames} = require('../db')

const createGame = (req, res) => {
const body = req.body

let results = Videogames.create(body).then((response)=>{
 res.status(201).send({
  response 
 })
}).catch((err)=>{
  res.status(404).send(err)
})

  
};



module.exports = {createGame}