'use strict'

const express = require('express'),
    ctrl      = require('./c_auth'),
    api       = express.Router();

api
    .get('/login',ensureAuth, ctrl.login)
    .post('/register',ensureAuth, ctrl.register )
    .get('/validateToken',ensureAuth, ctrl.validateToken)
module.exports = api;