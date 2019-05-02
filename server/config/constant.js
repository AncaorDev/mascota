global.JWT_KEY = 'super_clave';

global.HTTP_200 = 200;
global.HTTP_400 = 400;
global.HTTP_500 = 500;

global.MSJ_ERROR = 'Hubo un error';
global.ANP = 'Acción no permitida';


/**
 * Función para devolver el servicio cuando falla y que imprime un log en servidor
 * @param {*} url Mandas en string e nombre de tu mascara
 * @param {*} msj Mensaje que quieres que se muestre
 * @param {*} code codigo http
 * @param {*} res tu objeto para responder el servicio
 */
global.print_response_error = async (url, msj, res) => {
    // Errores controlados
    if (msj.status == global.HTTP_400)
        return res.status(msj.status).send(msj);

    // Errores no controlados
    console.log(`${url} ===> `, msj);
    if (res) {
        res.status(global.HTTP_500).send(msj);
    }
};