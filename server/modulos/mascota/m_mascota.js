
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

function insertScraper(_id_site,web_scraper_order,web_scraper_start_url, categorias, categorias_href, productos, enlace, nombre,precio,peso,marca,imagen) {
    return new Promise((resolve,reject) => {
        let sql = `INSERT INTO scraper_x_site
                      (_id_site,web_scraper_order,web_scraper_start_url, categorias, categorias_href, productos, enlace, nombre,precio,peso,marca,imagen)
                   SELECT $1,
                          $2,
                          $3,
                          $4,
                          $5,
                          $6,
                          $7,
                          $8,
                          $9,
                          $10,
                          $11,
                          $12`;
        sql = pgpromise.as.format(sql, [
            _id_site,
            web_scraper_order,
            web_scraper_start_url,
            categorias,
            categorias_href,
            productos,
            enlace,
            nombre,
            precio,
            peso,
            marca,
            imagen]);
        dbp.result(sql).then(data => {
            resolve(data);
        }).catch(err => {
            reject({ msj: global.MSJ_ERROR, err: "M_mascota => insertsuperpet => " + err });
        })
    });
}

// function getDataScraperBySite(data) {
//     return new Promise((resolve,reject) => {
//         let sql = `WITH scraper AS (
//                     SELECT sxs.*
//                       FROM scraper_x_site sxs,
//                            (SELECT UNNEST(CONCAT('{',$1,'}')::TEXT[]) AS desc_sabor) tab
//                      WHERE LOWER(sxs.nombre) ILIKE LOWER(CONCAT('%',tab.desc_sabor,'%')) OR LOWER(sxs.descripcion) ILIKE LOWER(CONCAT('%',tab.desc_sabor,'%'))
//                    )
//                    SELECT *,
//                           (SELECT __get_arry_nombre_mark(LOWER(s.nombre),(SELECT ARRAY_AGG(LOWER(tab.val))::CHARACTER VARYING[]
//                                                                             FROM (SELECT UNNEST(CONCAT('{',$1,'}')::TEXT[] || (SELECT tags::TEXT[]
//                                                                                                                                  FROM edades
//                                                                                                                                 WHERE _id_animal  = $2
//                                                                                                                                   AND correlativo = $3)
//                                                                                          ) AS val
//                                                                                  ) tab
//                                                                          )
//                                                         )
//                           ) AS arry_nombre,
//                           (SELECT __get_arry_nombre_mark(LOWER(s.descripcion),(SELECT ARRAY_AGG(LOWER(tab.val))::CHARACTER VARYING[]
//                                                                                  FROM (SELECT UNNEST(CONCAT('{',$1,'}')::TEXT[] || (SELECT tags::TEXT[]
//                                                                                                                                       FROM edades
//                                                                                                                                      WHERE _id_animal  = $2
//                                                                                                                                        AND correlativo = $3)
//                                                                                               ) AS val
//                                                                                       ) tab
//                                                                               )
//                                                         )
//                           ) AS arry_descrip,
//                           st.desc_site
//                      FROM scraper s,
//                           site st
//                     WHERE st.id_site = s._id_site
//                       AND LOWER(s.nombre) SIMILAR TO CONCAT('%(', (SELECT ARRAY_TO_STRING(tags, '|', '*') FROM edades WHERE _id_animal  = $2 AND correlativo = $3) , ')%'); `;
//         sql = pgpromise.as.format(sql, [data.sabores_selected, data.id_mascota, data.age]);
//         console.log(sql);
//         dbp.any(sql).then(data => {
//             resolve(data);
//         }).catch(err => {
//             reject({ msj: global.MSJ_ERROR, err: "M_mascota => getDataScraperBySite => " + err });
//         })
//     });
// }
function getDataScraperByMascota(id_mascota, recomendacion, filtros) {
    return new Promise((resolve,reject) => {
        let sql = `SELECT * FROM __func_01_get_data_scraper($1,$2,$3) res;`;
        sql = pgpromise.as.format(sql, [id_mascota, recomendacion, filtros]);
        // console.log(sql);
        dbp.one(sql).then(data => {
            if(data.res.status) return reject (data.res);
            resolve(data.res);
        }).catch(err => {
            reject({ msj: global.MSJ_ERROR, err: "M_mascota => getDataScraperByMascota => " + err });
        })
    });
}

function saveDataUser(id_mascota, recomendacion, filtros, id_usuario = null){
    return new Promise((resolve,reject) => {
        let sql = `SELECT * FROM __func_02_save_data_user($1,$2,$3,$4) res;`;
        sql = pgpromise.as.format(sql, [id_mascota, recomendacion, filtros, id_usuario]);
        // console.log(sql);
        dbp.one(sql).then(data => {
            if(data.res.status) return reject (data.res);
            resolve(data.res);
        }).catch(err => {
            reject({ msj: global.MSJ_ERROR, err: "M_mascota => saveDataUser => " + err });
        })
    });
}

function getSaborPorMascota(id_mascota) {
    return new Promise((resolve,reject) => {
        let sql = `SELECT s.id_sabor,
                          s.desc_sabor,
                          s.abvr,
                          CONCAT('./assets/images/svg/',s.imagen) AS imagen,
                          false AS enable
                     FROM sabor_x_animal sxa,
                          animal a,
                          sabor s
                    WHERE a.id_animal = $1
                      AND s.id_sabor  = sxa._id_sabor
                      AND s.flg_acti  = '1'`;
        sql = pgpromise.as.format(sql, [id_mascota]);
        dbp.any(sql).then(data => {
            resolve(data);
        }).catch(err => {
            reject({ msj: global.MSJ_ERROR, err: "M_mascota => getSaborPorMascota => " + err });
        })
    });
}

function getBeneficioPorMascota(id_mascota) {
    return new Promise((resolve,reject) => {
        let sql = `SELECT b.id_beneficio,
                          b.desc_beneficio,
                          b.abvr,
                          CONCAT('./assets/images/svg/',b.imagen) AS imagen,
                          false AS enable
                     FROM beneficio_x_animal sxa,
                          animal a,
                          beneficio b
                    WHERE a.id_animal = $1
                      AND b.id_beneficio  = sxa._id_beneficio
                      AND b.flg_acti  = '1'`;
        sql = pgpromise.as.format(sql, [id_mascota]);
        console.log(sql);
        dbp.any(sql).then(data => {
            resolve(data);
        }).catch(err => {
            reject({ msj: global.MSJ_ERROR, err: "M_mascota => getBeneficioPorMascota => " + err });
        })
    });
}

function getDataScraper() {
    return new Promise((resolve,reject) => {
        let sql = `SELECT * FROM scraper_x_site WHERE imagen IS NOT NULL`;
        sql = pgpromise.as.format(sql);
        console.log(sql);
        dbp.any(sql).then(data => {
            resolve(data);
        }).catch(err => {
            reject({ msj: global.MSJ_ERROR, err: "M_mascota => getDataScraper => " + err });
        })
    });
}

function deleteDataScraper(id_scraper, id_site){
    return new Promise((resolve,reject) => {
        let sql = `DELETE FROM scraper_x_site WHERE id_scraper = $1 AND _id_site = $2`;
        sql = pgpromise.as.format(sql, [id_scraper, id_site]);
        console.log(sql);
        dbp.result(sql).then(data => {
            resolve(data);
        }).catch(err => {
            reject({ msj: global.MSJ_ERROR, err: "M_mascota => getDataScraper => " + err });
        })
    });
}

function getTypeRecommendation() {
    return new Promise((resolve,reject) => {
        let sql = `SELECT * FROM recomendacion`;
        sql = pgpromise.as.format(sql);
        dbp.any(sql).then(data => {
            resolve(data);
        }).catch(err => {
            reject({ msj: global.MSJ_ERROR, err: "M_mascota => getTypeRecommendation => " + err });
        })
    });
}

module.exports = {
    getCombosByMascota,
    insertScraper,
    getDataScraperByMascota,
    getSaborPorMascota,
    getBeneficioPorMascota,
    getDataScraper,
    deleteDataScraper,
    saveDataUser,
    getTypeRecommendation
};