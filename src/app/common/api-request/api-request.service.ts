import * as _ from 'lodash';
import {Injectable} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface ApiRequestOptions {
    headers?: {
        [header: string]: string | string[];
    },
    params?: {
        [param: string]: string | string[];
    },
    reportProgress?: boolean;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean;
}

@Injectable()
export class ApiRequestService {
    private jwt: string;
    private baseUrl: string = `api`; // need to set

    constructor(private http: HttpClient) {
        this.jwt = localStorage.getItem('token');
    }

    createBasicAuthHeader(username, password) {
        const token = window.btoa(`${username}:${password}`);

        return {'Authorization': `Basic ${token}`};
    }

    createHeaders(headers?) {
        const data = {
            'Content-Type': 'application/vnd.busbud+json; version=2; profile=https://schema.busbud.com/v2/',
            'version': 2
        };

        // if (this.jwt && !_.get(headers, 'Authorization')) {
        //     defaults['Authorization'] = this.jwt;
        // }

        const merged = {};

        _.merge(merged, data);

        return new HttpHeaders(merged).set("X-Busbud-Token", "PARTNER_AHm3M6clSAOoyJg4KyCg7w");
    }

    createOptions(options?): ApiRequestOptions {
        const defaults = {
            responseType: 'json'
        };

        const merged = {};

        _.merge(merged, defaults, options);

        return merged;
    }

    get(url, options?) {
        return this.http.get(`${url}`, options);
    }

    post(url, body, options?): Observable<any> {
        return this.http.post(`${this.baseUrl}/${url}`, body, options);
    }

    put(url, body, options?) {
        return this.http.put(`${this.baseUrl}/${url}`, body, options);
    }

    delete(url, options?) {
        return this.http.request('DELETE', `${this.baseUrl}/${url}`, options);
    }

    setJwt(jwt: string): void {
        this.jwt = jwt;
        localStorage.setItem('token', jwt);
    }

    getJwt(): string {
        return this.jwt.replace('JWT ', '');
    }

    destroyToken(): void {
        localStorage.removeItem('token');
    }

    doesTokenExist(): boolean {
        return this.jwt !== null;
    }
}
