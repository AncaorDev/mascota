import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { Globals } from "./shared/globals";
import { HeadersService } from "./core/header.service";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class AppService implements OnInit{
    path_mascota:string;
    header:any;
    combos_mascota = new BehaviorSubject<any>(null);
    constructor(
        public _httpClient: HttpClient,
        public _headersService : HeadersService,
        public _globals :Globals
    ) {
        this.path_mascota = this._globals.__LOCAL_BACKEND__ +'/mascota/';
    }

    ngOnInit():void {
    }

    getJSON(): Observable<any> {
        return this._httpClient.get("./assets/data_opt.json");
    }

    getCombosByMascota(id_mascota:any):void {
        let Params = new HttpParams()
            .set('id_mascota', id_mascota);
        this._httpClient.get(this.path_mascota+'getCombosByMascota',{ params: Params }).subscribe(res => {
            this.combos_mascota.next(res);
        },err => {
            console.log(err);
        });
    }
}