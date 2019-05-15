'use strict'

function login(data) {
    return new Promise((resolve,reject) => {
        let sql = `SELECT * FROM __login($1,$2) res`;
        sql = pgpromise.as.format(sql, [data.username, data.password]);
        dbp.one(sql).then(data => {
            if (data.res.status) return reject(data.res);
            resolve(data.res);
        }).catch(err => {
            reject({ msj: global.MSJ_ERROR, err: "M_auth => login => " + err });
        })
    });
}

function register(nombres, apellidos, usuario, clave, flg_Acti = '1') {
    return new Promise((resolve,reject) => {
        let sql = `INSERT INTO persona (nom_persona, ape_pate_pers, usuario, clave , flg_Acti)
                                VALUES ($1         , $2           , $3     , $4    , $5) `;
        sql = pgpromise.as.format(sql, [nombres, apellidos, usuario, clave, flg_Acti]);
        console.log(sql);
        dbp.result(sql).then(data => {
            // if (data.res.status) return reject(data.res);
            resolve(data);
        }).catch(err => {
            reject({ msj: global.MSJ_ERROR, err: "M_auth => data => " + err });
        })
    });
}


function datosUserSession(id_persona) {
    return new Promise((resolve,reject) => {
        let sql = `SELECT * FROM persona WHERE id_persona = $1`;
        sql = pgpromise.as.format(sql, [id_persona]);
        dbp.any(sql).then(data => {
            resolve(data[0] ? data[0] : {});
        }).catch(err => {
            reject({ msj: global.MSJ_ERROR, err: "M_auth => datosUserSession => " + err });
        })
    });
}

function registerUser(data) {
    return new Promise((resolve,reject) => {
        let sql = `SELECT * FROM __auth__01_registrar_usuario($1) res`;
        sql = pgpromise.as.format(sql, [JSON.stringify(data)]);
        dbp.one(sql).then(data => {
            if (data.res.status) return reject(data.res);
            resolve(data.res);
        }).catch(err => {
            reject({ msj: global.MSJ_ERROR, err: "M_auth => registerUser => " + err });
        })
    });
}

module.exports = {
    login,
    datosUserSession,
    registerUser
};