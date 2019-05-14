'use strict'

function insertTableReturnId(tabla, json_insert, retorno) {
    return new Promise((resolve, reject) => {
        let table = _formatTable(tabla);
        let sql = pgpromise.helpers.insert(json_insert, null, table);
        dbp.one(sql + ' RETURNING ' + retorno, [], event => event)
            .then(data => resolve(data))
            .catch(err => {
                reject({ msj: global.MSJ_ERROR, err: "M_utils -> insertTableReturnId -> " + err });
            });
    });
}

function _formatTable(tabla) {
    let split = tabla.split('.');
    let schema_name = 'public';
    let table_name = '';
    if (split.length > 1) {
        schema_name = split[0];
        table_name = split[1];
    } else {
        table_name = split[0];
    }
    return pgpromise.helpers.TableName(table_name, schema_name);
}

module.exports = {
    insertTableReturnId
}