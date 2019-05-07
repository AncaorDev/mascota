'use strict'

const express = require('express'),
    ctrl      = require('./c_mascota'),
    api       = express.Router();

api
    .get('/getCombosByMascota'   , ensureAuth, ctrl.getCombosByMascota)
    .post('/insertScraper'       , ensureAuth, ctrl.insertScraper)
    .get('/getDataScraperBySite' , ensureAuth, ctrl.getDataScraperBySite)
    .get('/getSaborPorMascota'   , ensureAuth, ctrl.getSaborPorMascota)
    .get('/getBeneficioPorMascota', ensureAuth, ctrl.getBeneficioPorMascota)
    .get('/getDataScraper'        , ensureAuth, ctrl.getDataScraper)
    .get('/deleteDataScraper'     , ensureAuth, ctrl.deleteDataScraper)

module.exports = api;