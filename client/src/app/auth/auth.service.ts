import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/internal/Observable";
import { Globals } from "../shared/globals";
import { HeadersService } from "../core/header.service";
import { BehaviorSubject } from "rxjs";
import { AppService } from "../app.service";

@Injectable()
export class AuthService {
  path_auth:string;
  header:any;
  constructor(
      public _httpClient: HttpClient,
      public _headersService : HeadersService,
      public _globals :Globals,
      private _app_srv:AppService
  ) {
      this.path_auth = this._globals.__LOCAL_BACKEND__ +'/auth/';
      this.header = this._headersService.buildService();
  }


    login(values:any): Observable<any> {
        let Params = new HttpParams()
            .set('username', values.username)
            .set('password', values.password);
        return this._httpClient.get(this.path_auth+'login',{ params: Params });
    }

    validateToken(token:string):void {
        let Params = new HttpParams()
            .set('token', token);
        this._httpClient.get(this.path_auth+'validateToken',{ params: Params }).subscribe(res => {
            this._app_srv.user.next(res);
        });
    }

    register(data:any): Observable<any> {
        return this._httpClient.post(this.path_auth+'register',{data}, this.header);
    }

}