
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

function getDataScraperBySite(data) {
    return new Promise((resolve,reject) => {
        let sql = `WITH scraper AS (
                        SELECT sxs.*
                          FROM scraper_x_site sxs,
                               (SELECT UNNEST(CONCAT('{',$1,'}')::TEXT[]) AS desc_sabor) tab
                         WHERE LOWER(sxs.nombre) ILIKE LOWER(CONCAT('%',tab.desc_sabor,'%'))
                        )
                   SELECT *,
                          (SELECT __get_arry_nombre_mark(LOWER(s.nombre),(SELECT ARRAY_AGG(LOWER(tab.val))::CHARACTER VARYING[]
                                                                     FROM (SELECT UNNEST(CONCAT('{',$1,'}')::TEXT[] || CONCAT('{',(SELECT LOWER(SUBSTRING(desc_edad,1,5))
                                                                                                                                     FROM edades 
                                                                                                                                    WHERE _id_animal  = $2
                                                                                                                                      AND correlativo = $3
                                                                                                                                  ),'}'
                                                                                                                             )::TEXT[]
                                                                                  ) AS val
                                                                          ) tab
                                                                  )
                                                        )
                          ) AS arry_nombre
                     FROM scraper s
                    WHERE LOWER(s.nombre) ILIKE LOWER(CONCAT('%',(SELECT SUBSTRING(desc_edad,1,5) 
                                                                    FROM edades 
                                                                   WHERE _id_animal  = $2
                                                                     AND correlativo = $3),'%'))`;
        sql = pgpromise.as.format(sql, [data.sabores_selected, data.id_mascota, data.age]);
        dbp.any(sql).then(data => {
            resolve(data);
        }).catch(err => {
            reject({ msj: global.MSJ_ERROR, err: "M_mascota => getDataScraperBySite => " + err });
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

module.exports = {
    getCombosByMascota,
    insertScraper,
    getDataScraperBySite,
    getSaborPorMascota
};