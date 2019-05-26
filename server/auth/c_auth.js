
'use strict'

const M_auth = require('./m_auth');
const M_utils = require('./../utils/m_utils')
async function login(req, res) {
    try {
       let data_req = req.query;
       if (!data_req.username || !data_req.password) throw {status:global.HTTP_400, msj : global.ANP};

        let data  = await M_auth.login(data_req);
        if(data && data.data && data.data.clave) {
                delete data.data.clave;
        }
        if(data.data){
            if(data.data.usuario == 'admin' && data.data.id_persona == 19){
                data.data['is_admin'] = true;
            }
        }

        let token = jwt.encode({id_persona: data.data.id_persona},JWT_KEY);
        res.status(global.HTTP_200).send({data : data.data, token});
    } catch (err) {
        print_response_error(req.url, err, res);
    }
}

async function register(req, res) {
    try {
        let data_req = req.body;
        let query =  {nom_persona   : data_req.nom_persona,
                      ape_pate_pers : data_req.ape_pate_pers,
                      ape_mate_pers : data_req.ape_mate_pers,
                      usuario       : data_req.username,
                      clave         : data_req.password,
                      flg_acti      : '1' }
        let data  = await M_utils.insertTableReturnId('persona', query, 'id_persona');
        if(!data.id_persona) {
            throw { msj : 'Hubo un error'}
        }
        query.id_persona = data.id_persona;
        let token = jwt.encode({id_persona: data.id_persona},JWT_KEY);
        res.status(global.HTTP_200).send({msj : 'Registro exitosó' , data : query,  token : token});
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

// async function register(req,res) {
//     try {
//         let   data_req = req.body.data;
//         // Validar campos requeridos
//         if (!data_req.nom_persona ||
//             !data_req.ape_pate_pers ||
//             !data_req.ape_mate_pers ||
//             !data_req.username ||
//             !data_req.password) {
//             throw {status: global.HTTP_400, msj : global.ANP};
//         }
        
//         // Registrar en bd
//         let rpta = await M_auth.registerUser(data_req);

//         // Retornar respuesta
//         res.status(global.HTTP_200).send(rpta);
//     } catch (err) {
//         print_response_error(req.url, err, res);
//     }
// }
module.exports = {
    login,
    validateToken,
    register
};