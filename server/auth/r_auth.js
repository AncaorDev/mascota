'use strict'

const express = require('express'),
    ctrl      = require('./c_auth'),
    api       = express.Router();

api
    .get('/login',ensureAuth, ctrl.login)
module.exports = api;