
'use strict'

const M_mascota = require('./m_mascota');

async function getCombosByMascota(req, res) {
    try {
        let id_mascota = parseInt(req.query.id_mascota);
        let combos     = await M_mascota.getCombosByMascota(id_mascota);
        res.status(global.HTTP_200).send(combos);
    } catch (err) {
        print_response_error(req.url, err, res);
    }
}

async function insertScraper(req,res) {
    try {
        let data = require('./supert_pet.json');
        for (let row of data) {
            await M_mascota.insertScraper(
                1,
                row.web_scraper_order,
                row.web_scraper_start_url,
                row.categorias,
                row.categorias_href,
                row.productos,
                row.enlace,
                row.nombre,
                row.precio,
                row.peso,
                row.marca,
                row.imagen
            );
        }
        res.send({msj : 'Se inserto'});
    } catch (err) {
        print_response_error(req.url, err, res);
    }
}

async function getDataScraperBySite(req,res) {
    try {
        let id_site = 1;
        let data = await M_mascota.getDataScraperBySite(id_site);
        res.status(global.HTTP_200).send(data);
    } catch (err) {
        print_response_error(req.url, err, res);
    }
}
module.exports = {
    getCombosByMascota,
    insertScraper,
    getDataScraperBySite
};