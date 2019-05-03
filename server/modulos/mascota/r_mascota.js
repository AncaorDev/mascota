'use strict'

const express = require('express'),
    ctrl      = require('./c_mascota'),
    api       = express.Router();

api
    .get('/getCombosByMascota',ensureAuth, ctrl.getCombosByMascota)
    .post('/insertScraper',ensureAuth, ctrl.insertScraper)
    .get('/getDataScraperBySite',ensureAuth, ctrl.getDataScraperBySite)
    
module.exports = api;