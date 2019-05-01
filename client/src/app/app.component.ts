import { Component } from '@angular/core';
import { AppService } from './app.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers:[AppService]
})
export class AppComponent {
    title:string = 'Mascota';
    constructor(private app_srv: AppService){

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
