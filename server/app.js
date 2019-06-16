'use strict'
const port = process.env.PORT || 4000,
	  express    = require('express'),
	  bodyParser = require('body-parser'),
	  cors       = require('cors'),
	  app        = express();

// Configurations
require('./config/constant');
require('./config/authenticated');
require('./helpers/util.helper');

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
let r_auth    = require('./auth/r_auth');

app
	.use('/mascota', r_mascota)
	.use('/auth', r_auth);
	// Iniciar servidor
app.listen(port, () => {});

module.exports = app;