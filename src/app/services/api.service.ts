import { Injectable } from '@angular/core';
import { config } from '../config';
import APIConnectivity from 'src/plugins/api-plugins';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { firstValueFrom, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  async sendPostRequest<T = any>(
    apiKey: string,
    parameterBody: any
  ): Promise<any> {
    try {
      // Initialize body
      let body: any = {};

      // Convert body
      const convertedBody = JSON.stringify(parameterBody);

      const url = this.generateApiUrl(apiKey);

      // Create API request parameters

      // const param = {
      //   url: url,
      //   methodType: 'POST',
      //   parameter: parameterBody,
      // };
      // // Send request
      // const res = await APIConnectivity.request(param);
      // const response = JSON.parse(res.data);
      // if (response?.Message?.includes('No HTTP resource was found')) {
      //   throw new Error(response.Message);
      // }
      // if (Number(response.statusCode) === 500) {
      //   throw new Error(response.description);
      // }

      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });

      // const body = JSON.stringify(parameterBody);

      const response = await firstValueFrom(
        this.http.post<T>(url, parameterBody, { headers }).pipe(
          catchError((error: HttpErrorResponse) => {
            console.error('HTTP Error:', error);
            return throwError(() => error);
          })
        )
      );

      console.log('respone', response);

      return response;
    } catch (error) {
      // Proper error handling
      console.error('API request failed:', error);
      throw error; // Re-throw to let caller handle it
    }
  }
  generateApiUrl(apiKey: string): string {
    const isMessageKey =
      apiKey === 'PushNotificationMessageInfo_Get' ||
      apiKey === 'PushNotificationMessage_Validate';

    const baseURL = isMessageKey ? config.Env_ITUATNOT : config.Env_ITUAT;

    return `${baseURL}${apiKey}`;
  }
}
