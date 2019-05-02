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

module.exports = {
    login
};