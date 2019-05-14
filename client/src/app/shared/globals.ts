import { Injectable } from '@angular/core';

@Injectable()
export class Globals {
    iconos : any = {
        pileta: 'assets/images/svg/pileta.svg'
    }

    static get ICONS() {
        return {
            pileta: 'assets/images/svg/pileta.svg',
            capacitacion: 'assets/images/svg/capacitacion.svg',
            actividades: 'assets/images/svg/actividades.svg',
            voluntariado: 'assets/images/svg/voluntariado.svg',
            proyectos: 'assets/images/svg/proyectos.svg'
        }
    }

    __LOCAL_BACKEND__: string = 'http://localhost:3000';
    __MINLENGTH_PASS = 6;
    __DATA_USER:any;
}