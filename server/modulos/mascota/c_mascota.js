
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
module.exports = {
    getCombosByMascota
};