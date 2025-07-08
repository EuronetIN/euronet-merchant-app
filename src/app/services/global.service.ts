import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
baseUrl = 'https://epayuat.eftapme.com:8801/IOBMobileEnc/api/2.0'
  

  constructor(
    private http: HttpClient,
  ) { }







  getData() {
    this.http.get(`${this.baseUrl}/values`);
  }



  getApiResponse(
    endpoint: string,
    payload?: any,
    queryParams?: any,
    callback?: (response: any) => void
  ): void {
    const url = `${this.baseUrl}/${endpoint}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    console.log('FullUrl : ' + endpoint, 'payload' + payload, + 'queryParams' + queryParams);
    let params = new HttpParams();
    console.log('params ', params)
    if (queryParams) {
      Object.keys(queryParams).forEach(key => {
        if (queryParams[key] != null) {
          params = params.append(key, queryParams[key]);
        }
      });
    }

    if (payload) {
      // POST method
      console.log('from payload')
      this.http.post(url, payload)
        .pipe(catchError(error => {
          console.error('POST error:', error);
          return throwError(() => error);
        }))
        .subscribe(res => {
          if (callback) callback(res);
        });
    } else {
      // GET method
      this.http.get(url, { headers, params })
        .pipe(catchError(error => {
          console.error('GET error:', error);
          return throwError(() => error);
        }))
        .subscribe(res => {
          if (callback) callback(res);
        });
    }
  }
}
