'use strict'
const express    = require('express'),
	  bodyParser = require('body-parser'),
	  cors       = require('cors'),
	  app        = express();

// Configurations
require('./config/constant');
require('./config/authenticated');

// JWT
global.jwt = require('jwt-simple');

app
	// parse application/json
	.use(bodyParser.json())
	// parse application/x-www-form-urlencoded
	.use(bodyParser.urlencoded({extended : false}))
	// Cabecera http
    .use(cors());

// Routes
let r_mascota = require('./modulos/mascota/r_mascota');

app
    .use('/mascota', r_mascota)


module.exports = app;