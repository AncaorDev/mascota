
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
        console.log(req.query);
        let data_req              = JSON.parse(req.query.data);
        // data_req.id_site          = 1;
        data_req.selected = Array.from(data_req.selected, row => row.abvr);
        data_req.selected = data_req.selected.length > 0 ? data_req.selected.join() : '';
        let filtros  = {
            feeding  : data_req.feeding,
            race     : data_req.race,
            size     : data_req.size,
            age      : data_req.age,
            selected : data_req.selected
        }
        if(data_req.token) {
            data_req.token = jwt.decode(__get(req.query.token), JWT_KEY);
        }
        let data = await M_mascota.getDataScraperByMascota(data_req.id_mascota, data_req.recomendacion, filtros);
        let save = await M_mascota.saveDataUser(data_req.id_mascota, data_req.recomendacion, filtros, data_req.token);
        res.status(global.HTTP_200).send(data);
    } catch (err) {
        print_response_error(req.url, err, res);
    }
}

async function getSaborPorMascota(req,res) {
    try {
        let data_req = req.query;

        // Traer sabores
        let data = await M_mascota.getSaborPorMascota(data_req.id_mascota);
        res.status(global.HTTP_200).send(data);
    } catch (err) {
       print_response_error(err);
    }
}

async function getBeneficioPorMascota(req,res) {
    try {
        let data_req = req.query;
        // Traer sabores
        let data = await M_mascota.getBeneficioPorMascota(data_req.id_mascota);
        res.status(global.HTTP_200).send(data);
    } catch (err) {
       print_response_error(err);
    }
}

async function getDataScraper(req,res) {
    try {
        let data = await M_mascota.getDataScraper();
        res.status(global.HTTP_200).send(data);
    } catch (err) {
       console.log(err);
    }
}

async function deleteDataScraper(req,res) {
    // let data_req = req.query;
    let info = JSON.parse(req.query.data);
    let data = await M_mascota.deleteDataScraper(info.scraper.id_scraper, info.scraper._id_site);
    res.status(global.HTTP_200).send(data);
}

async function getTypeRecommendation(req,res) {
    // let info = JSON.parse(req.query.data);
    let data = await M_mascota.getTypeRecommendation();
    res.status(global.HTTP_200).send(data);
}

module.exports = {
    getCombosByMascota,
    insertScraper,
    getDataScraperBySite,
    getSaborPorMascota,
    getBeneficioPorMascota,
    getDataScraper,
    deleteDataScraper,
    getTypeRecommendation
};