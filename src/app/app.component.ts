import { Component } from '@angular/core';
// import { AncaorInicioObservable } from './app.observable';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    // providers:[AncaorInicioObservable]
})
export class AppComponent {
    title:string = 'Mascota';
    constructor(){

    }
    ngOnInit(){

    }
    ngAfterViewInit() {

    }

    myEndFunction(){

    }

    ngOnDestroy(){

    }
}
