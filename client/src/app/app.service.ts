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
    user = new BehaviorSubject<any>({});
    sabores_x_mascota = new BehaviorSubject<any[]>(null);
    beneficio_x_mascota  = new BehaviorSubject<any[]>(null);

    scraperData = new BehaviorSubject<any[]>(null);
    deleteData = new BehaviorSubject<any[]>(null);

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

    getDataSuperPet(): Observable<any> {
        return this._httpClient.get("./assets/supert_pet.json");
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

    getDataScraperBySite(obj:any): Observable<any> {
        let Params = new HttpParams()
            .set('data', JSON.stringify(obj));
        return this._httpClient.get(this.path_mascota+'getDataScraperBySite',{ params: Params });
    }

    getSaborPorMascota(obj:any):void {
        let Params = new HttpParams()
            .set('id_mascota', obj.id_mascota);
        this._httpClient.get(this.path_mascota+'getSaborPorMascota',{ params: Params }).subscribe((res:any) => {
            this.sabores_x_mascota.next(res);
        },err => {
            console.log(err);
        });
    }

    getBeneficioPorMascota(obj:any):void {
        let Params = new HttpParams()
            .set('id_mascota', obj.id_mascota);
        this._httpClient.get(this.path_mascota+'getBeneficioPorMascota',{ params: Params }).subscribe((res:any) => {
            this.beneficio_x_mascota.next(res);
        },err => {
            console.log(err);
        });
    }


    getDataScraper(obj:any): Observable<any> {
        let Params = new HttpParams()
            .set('data', JSON.stringify(obj));
        return this._httpClient.get(this.path_mascota+'getDataScraper',{ params: Params });
    }


    deleteDataScraper(obj:any): Observable<any> {
        let Params = new HttpParams()
            .set('data', JSON.stringify(obj));
        return this._httpClient.get(this.path_mascota+'deleteDataScraper',{ params: Params });
    }

    getTypeRecommendation(obj:any): Observable<any> {
        let Params = new HttpParams()
            .set('data', JSON.stringify(obj));
        return this._httpClient.get(this.path_mascota+'getTypeRecommendation',{ params: Params });
    }

    getUsers(obj:any): Observable<any> {
        let Params = new HttpParams()
            .set('data', JSON.stringify(obj));
        return this._httpClient.get(this.path_mascota+'getUsers',{ params: Params });
    }
}