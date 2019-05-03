
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

function getDataScraperBySite(id_site) {
    return new Promise((resolve,reject) => {
        let sql = `SELECT *
                     FROM scraper_x_site
                    ORDER BY id_scraper`;
        sql = pgpromise.as.format(sql, [id_site]);
        dbp.any(sql).then(data => {
            resolve(data);
        }).catch(err => {
            reject({ msj: global.MSJ_ERROR, err: "M_mascota => getDataScraperBySite => " + err });
        })
    });
}

module.exports = {
    getCombosByMascota,
    insertScraper,
    getDataScraperBySite
};