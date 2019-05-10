'use strict';
const serverless = require('serverless-http');

var express    = require('express'),
    app        = express(),
    bodyParser = require('body-parser'),
    cors       = require('cors');

require('./config/constant');
require('./config/authenticated');
require('./helpers/util.helper');

// JWT
global.jwt = require('jwt-simple');

app.use(cors({'origin' : '*'}))
    .use(bodyParser.urlencoded({ extended:false }))
	.use(bodyParser.json());

let r_mascota = require('./modulos/mascota/r_mascota');
let r_auth    = require('./auth/r_auth');

let basepath  = process.env.BASE_PATH;

app.use(`/${basepath}/api`, r_mascota)
   .use(`/${basepath}/api/auth`, r_auth);

module.exports.handler = serverless(app, {
    request: (request, event, context) => {
		console.log(request);
        // let origin = request.headers.origin;
        // initValues(origin);
        // if (!isOffline && request.socket.remoteAddress) {
        //     await global.initDatabaseCredentials();
        // }
    },
    response: (response, event, context) => {
		console.log(response);
        // return new Promise(resolve => {
        //     if(global.dbp && global.pgpromise && !isOffline) {
        //         global.pgpromise.end();
        //     }
        //     resolve(null);
        // });
    }
})