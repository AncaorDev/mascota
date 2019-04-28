import { Injectable, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";

@Injectable()
export class AppService implements OnInit{
    constructor(
        public _httpClient: HttpClient,
    ) {

    }

    ngOnInit():void {
    }

    getJSON(): Observable<any> {
        return this._httpClient.get("./assets/data_opt.json");
    }
}