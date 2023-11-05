import { Observable } from 'rxjs';
import { OnInit } from '@angular/core';
import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class publicService {
  env = environment;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor (private http: HttpClient ) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
  }

  // get all
  getAll(apiController: string): Observable<any[]> {
    this.httpOptions
    return this.http.get<any[]>(
      this.env.baseUrl + apiController,
      this.httpOptions
    );
  }

  getPdf(apiController: string, action: string) {
    const httpOptions = {
      responseType: 'blob' as 'json',
      observe: "response" as 'body',
    };

    return this.http.get(this.env.baseUrl + apiController + "/" + action, httpOptions);
  }

  getCustom(apiController: string): Observable<any> {
    return this.http.get<any>(
      this.env.baseUrl + apiController
    );
  }

  Remove(data: any, apiController: string, action?: string): Observable<any> {
    if (action) {
      return this.http.delete<any>(this.env.baseUrl + apiController + '/' + action, data);
    } else {
      return this.http.delete<any>(this.env.baseUrl + apiController + '/', {
        params: {
          id: data
        }
      });
    }
  }

  // add
  post(data: any, apiController: string, action?: string): Observable<any> {
    if (action) {
      return this.http.post<any>(
        this.env.baseUrl + apiController + '/' + action,
        data
      );
    } else {
      return this.http.post<any>(this.env.baseUrl + apiController, data);
    }
  }

  put(data: any, apiController: string, action?: string): Observable<any> {
    return this.http.put<any>(this.env.baseUrl + apiController + '/' + action, data);
  }

  //paramsName can be null when params can be any so?
  get(apiController: string, params: any, paramsName: string) {
    return this.http.get(this.env.baseUrl + apiController, {
      params: {
        [paramsName]: params
      }
    });
  }

  Leaverget(apiController: string) {
    return this.http.get(this.env.baseUrl + apiController);
  }

  getModel(apiController: string, params: any, paramsName: string) {
    return this.http.get<any>(this.env.baseUrl + apiController, {
      params: {
        [paramsName]: params
      }
    });
  }

  patch(apiController,data){
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
    return this.http.patch<any>(
      this.env.baseUrl+ apiController,
      data,
      httpOptions
    );
  }

  getData(apiController: string, params?: any): Observable<any> {
    return this.http.get<any>( this.env.baseUrl + apiController, {
      params,
    });
  }
}
