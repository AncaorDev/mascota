'use strict'

const express = require('express'),
    ctrl      = require('./c_auth'),
    api       = express.Router();

api
    .get('/login',ensureAuth, ctrl.login)
    .get('/validateToken',ensureAuth, ctrl.validateToken)
    .post('/register',ensureAuth, ctrl.register)
module.exports = api;