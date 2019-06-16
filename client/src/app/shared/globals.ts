import { Injectable } from '@angular/core';

@Injectable()
export class Globals {

    static get ICONS() {
        return {
            pileta: 'assets/images/svg/pileta.svg',
            capacitacion: 'assets/images/svg/capacitacion.svg',
            actividades: 'assets/images/svg/actividades.svg',
            voluntariado: 'assets/images/svg/voluntariado.svg',
            proyectos: 'assets/images/svg/proyectos.svg',
            facebook: 'assets/images/svg/facebook.svg',
            twitter: 'assets/images/svg/twitter.svg',
            google: 'assets/images/svg/google-plus.svg'
        }
    }

    __LOCAL_BACKEND__: string = 'https://api.ancaor.com'; 
    __MINLENGTH_PASS = 6;
    __DATA_USER:any;


    get RedesSociales() {
        return {
            FACEBOOK : 'facebook',
            GOOGLE : 'google'
        };
    }
}