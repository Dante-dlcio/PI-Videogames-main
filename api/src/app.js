const express = require('express');
const routes = require('./routes/index.js');
require('./db.js');

const server = express();
server.name = 'API';

//Middlewares
require('./middlewares')(server)

//Rutes
server.use('/', routes);

// Error catching endware.
const errorHandler= require('./middlewares/errorHandler.js');
server.use(errorHandler);

module.exports = server;
