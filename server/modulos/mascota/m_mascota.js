
'use strict'

function getCombosByMascota(id_mascota) {
    return new Promise((resolve,reject) => {
        let sql = `SELECT JSONB_BUILD_OBJECT(
                            'race', JSONB_BUILD_OBJECT(
                                        'desc', 'Raza',
                                        'data', COALESCE((SELECT ARRAY_TO_JSON(ARRAY_AGG(tab))::JSONB
                                                            FROM (SELECT correlativo AS value,
                                                                         desc_raza   AS desc 
                                                                    FROM raza
                                                                   WHERE _id_animal = m.id_mascota) tab
                                                         ),'[]'::JSONB
                                                )
                                    ),
                            'size', JSONB_BUILD_OBJECT(
                                        'desc', 'Tamaño',
                                        'data', COALESCE((SELECT ARRAY_TO_JSON(ARRAY_AGG(tab))::JSONB
                                                            FROM (SELECT correlativo AS value,
                                                                         desc_size   AS desc 
                                                                    FROM size
                                                                   WHERE _id_animal = m.id_mascota) tab
                                                        ),'[]'::JSONB
                                                )
                                    ),
                            'age', JSONB_BUILD_OBJECT(
                                        'desc', 'Edad',
                                        'data', COALESCE((SELECT ARRAY_TO_JSON(ARRAY_AGG(tab))::JSONB
                                                            FROM (SELECT correlativo AS value,
                                                                         desc_edad   AS desc 
                                                                    FROM edades
                                                                   WHERE _id_animal = m.id_mascota) tab
                                                        ),'[]'::JSONB
                                                )
                                    ),
                        'feeding', JSONB_BUILD_OBJECT(
                                        'desc', 'Alimentación',
                                        'data', COALESCE((SELECT ARRAY_TO_JSON(ARRAY_AGG(tab))::JSONB
                                                            FROM (SELECT correlativo AS value,
                                                                         desc_alimento   AS desc 
                                                                    FROM alimento
                                                                   WHERE _id_animal = m.id_mascota) tab
                                                        ),'[]'::JSONB
                                                )
                                    )
                        ) AS combos
                   FROM (SELECT $1 AS id_mascota) m;`;
        sql = pgpromise.as.format(sql, [id_mascota]);
        dbp.any(sql).then(data => {
            resolve(data[0].combos);
        }).catch(err => {
            reject({ msj: global.MSJ_ERROR, err: "M_mascota => getCombosByMascota => " + err });
        })
    });
}
module.exports = {
    getCombosByMascota
};