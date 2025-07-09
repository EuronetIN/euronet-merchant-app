import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  baseUrl = 'https://epayuat.eftapme.com:8801/IOBMobileEnc/api/2.0';

  constructor(private http: HttpClient) {}

  private hexToWordArray(hex: string): CryptoJS.lib.WordArray {
    return CryptoJS.enc.Hex.parse(hex);
  }

  private wordArrayToHex(wordArray: CryptoJS.lib.WordArray): string {
    return CryptoJS.enc.Hex.stringify(wordArray);
  }

  // Encrypt AES/ECB/NoPadding
  encryptAesEcbNoPadding(plainText: string, hexKey: string): string {
    try {
      const key = this.hexToWordArray(hexKey);
      const data = CryptoJS.enc.Utf8.parse(plainText);

      const encrypted = CryptoJS.AES.encrypt(data, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.NoPadding,
      });

      return this.wordArrayToHex(encrypted.ciphertext);
    } catch (error) {
      console.error('AES Encryption Error:', error);
      return '';
    }
  }

  // Decrypt AES/ECB/NoPadding
  decryptAesEcbNoPadding(cipherHex: string, hexKey: string): string {
    try {
      const key = this.hexToWordArray(hexKey);
      const ciphertext = this.hexToWordArray(cipherHex);

      // Properly wrap it as CipherParams
      const cipherParams = CryptoJS.lib.CipherParams.create({
        ciphertext: ciphertext,
      });

      const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.NoPadding,
      });

      return decrypted.toString(CryptoJS.enc.Utf8).trim();
    } catch (error) {
      console.error('AES Decryption Error:', error);
      return '';
    }
  }

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
      'Content-Type': 'application/json',
    });
    console.log(
      'FullUrl : ' + endpoint,
      'payload' + payload,
      +'queryParams' + queryParams
    );
    let params = new HttpParams();
    console.log('params ', params);
    if (queryParams) {
      Object.keys(queryParams).forEach((key) => {
        if (queryParams[key] != null) {
          params = params.append(key, queryParams[key]);
        }
      });
    }

    if (payload) {
      // POST method
      console.log('from payload');
      this.http
        .post(url, payload)
        .pipe(
          catchError((error) => {
            console.error('POST error:', error);
            return throwError(() => error);
          })
        )
        .subscribe((res) => {
          if (callback) callback(res);
        });
    } else {
      // GET method
      this.http
        .get(url, { headers, params })
        .pipe(
          catchError((error) => {
            console.error('GET error:', error);
            return throwError(() => error);
          })
        )
        .subscribe((res) => {
          if (callback) callback(res);
        });
    }
  }
}
