import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers:[AuthService]
})
export class AppComponent implements OnInit{
    title:string = 'Mascota';
    token:string = null;
    constructor(
        private _authService : AuthService
        ) {
        this.token = localStorage.getItem('token');
        console.log(this.token);
        if (this.token) {
            this.validateToken();
        }
    }

    ngOnInit(): void {
    }

    validateToken():void {
        this._authService.validateToken(this.token);
    }
}
