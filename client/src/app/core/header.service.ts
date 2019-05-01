import { Injectable } from "@angular/core";
import { HttpHeaders } from "@angular/common/http";

export interface IAccessParams {
    accessToken?: string;
}
// const TOKEN_NAMES = {
//     ACCESS: 'access-auth',
// };

@Injectable()
export class HeadersService {
    // build(params?: IAccessParams) {
    //     let headers = {
    //         'Content-Type': 'Application/json'
    //     };
    //     if (params.accessToken) headers[TOKEN_NAMES.ACCESS] = params.accessToken;
    //     return headers;
    // }

    /*buildService() {
        let headers = new Headers({
            'Content-Type': 'application/json'
        });
        return { headers: headers };
    }*/

    buildService() {
        let headers = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        return { headers: headers };
    }

    buildServiceFormData(token: any) {
        let headers = new HttpHeaders({
            Authorization: token
        });
        return { headers: headers };
    }
}