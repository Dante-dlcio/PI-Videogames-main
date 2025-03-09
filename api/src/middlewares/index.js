const express = require('express');
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const cors = require('cors')

module.exports = (server)=>{
    server.use(express.urlencoded({extended: true, limit:'50mb'}));
    server.use(express.json({limit:'50mb'}));
    server.use(cookieParser());
    server.use(morgan('dev'));

    server.use(cors({
        origin:process.env.FRONTEND_URL || 'http://localhost:3000',
        credentials:true
    }));
};