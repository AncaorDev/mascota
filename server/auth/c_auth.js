
'use strict'

const M_auth = require('./m_auth');

async function login(req, res) {
    try {
       let data_req = req.query;
       if (!data_req.username || !data_req.password) throw {status:global.HTTP_400, msj : global.ANP};

       let data  = await M_auth.login(data_req);
       let token = jwt.encode({id_persona: data.data.id_persona},JWT_KEY);
       res.status(global.HTTP_200).send({data : data.data, token});
    } catch (err) {
        print_response_error(req.url, err, res);
    }
}

async function validateToken(req,res) {
    try {
        let token = jwt.decode(__get(req.query.token), JWT_KEY);
        let data  =  await M_auth.datosUserSession(token.id_persona);
        res.status(global.HTTP_200).send(data);
    } catch (err) {
        print_response_error(req.url, err, res);
    }
}

async function register(req,res) {
    try {
        let   data_req = req.body.data;
        // Validar campos requeridos
        if (!data_req.nom_persona ||
            !data_req.ape_pate_pers ||
            !data_req.ape_mate_pers ||
            !data_req.username ||
            !data_req.password) {
            throw {status: global.HTTP_400, msj : global.ANP};
        }
        
        // Registrar en bd
        let rpta = await M_auth.registerUser(data_req);

        // Retornar respuesta
        res.status(global.HTTP_200).send(rpta);
    } catch (err) {
        print_response_error(req.url, err, res);
    }
}
module.exports = {
    login,
    validateToken,
    register
};