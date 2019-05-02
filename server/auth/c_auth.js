
'use strict'

const M_auth = require('./m_auth');

async function login(req, res) {
    try {
       let data_req = req.query;
       if (!data_req.username || !data_req.password) throw {status:global.HTTP_400, msj : global.ANP};

       let data = await M_auth.login(data_req);    
       res.status(global.HTTP_200).send(data.data);
    } catch (err) {
        print_response_error(req.url, err, res);
    }
}
module.exports = {
    login
};