import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { LocalStorageEnum } from 'base/enums/LocalStorageEnum.enum';
import { QueryParamDTO } from 'base/models/shared/QueryParamDTO';
import { catchError, map } from 'rxjs';
import { ResponseDTO } from 'base/models/shared/ResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient,
  ) { }

  setTokenExpiriation(isExpire: boolean) {
    const user = JSON.parse(localStorage.getItem(LocalStorageEnum.app_user));
    user.is_token_expired = isExpire;
    localStorage.setItem(LocalStorageEnum.app_user, JSON.stringify(user));
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  prepareRequestHeaders2(containFiles: boolean = false, isExternal: boolean = false) {
    let headers: HttpHeaders = new HttpHeaders();

    if (!isExternal) {

      if (containFiles) {
        headers = headers.append('Accept', 'application/json');
      } else {
        headers = headers.append('Content-Type', 'application/json');
      }

    }
    const token = localStorage.getItem(LocalStorageEnum.Access_Token);
    if (token && !isExternal) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  prepareRequestHeaders(containFiles: boolean = false) {
    let headers: HttpHeaders = new HttpHeaders();

    if (containFiles) {
      headers.append('Accept', 'application/json');
    } else {
      headers.append('Content-Type', 'application/json');
    }

    const token = localStorage.getItem(LocalStorageEnum.Access_Token);
    if (token) {
      headers.append('Authorization', `Bearer ${token}`);
      (token)
    }
    return headers;
  }

  ReturnParameterizedUrl(params: QueryParamDTO[]): HttpParams {
    // params
    let httpParams: HttpParams = new HttpParams();
    if (!params) {
      return httpParams;
    }
    params.forEach(res => {
      if (res.value) {
        if (Array.isArray(res.value)) { // Incase you pass array of Ids
          let arr = res.value as string[];
          httpParams = httpParams.append(res.key, JSON.stringify(arr.join(',')));
        } else if (typeof res.value == 'object') {
          Object.keys(res.value).forEach(k => {
            httpParams = httpParams.append(k, res.value[k]);
          })
          // url = url + `&&${key}=` + new Date(this.filterDto[key]).toISOString();
        } else {
          httpParams = httpParams.append(res.key, res.value);
        }

      }
    });
    return httpParams;
  }

  // GET request
  GET(url: string, params: QueryParamDTO[] = []) {
    // params
    let httpParams: HttpParams = this.ReturnParameterizedUrl(params);
    // headers
    const token = localStorage.getItem(LocalStorageEnum.Access_Token);
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    headers = headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.append('Access-Control-Allow-Credentials', 'true');
    headers = headers.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
    headers = headers.append('Access-Control-Allow-Headers', '*');
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    return this.http.get(url, { observe: 'response', params: httpParams, headers })
      .pipe(
        catchError(err => {
          if (err.status <= 400 || err.status === 500) {
            const errSTR = JSON.stringify(err);
            const errJSON = JSON.parse(errSTR);
            return (errJSON._body);
          } else if (err.status === 401) { // 401 (not authorized)
            token ? this.setTokenExpiriation(true) : this.authService.logout();
          } else if (err.status === 403) { // 403 (Forbidden)
            this.router.navigate(['/auth/login']);
          }
        })
        , map((res: any) => res['body'] as ResponseDTO)
      );

  }


  // POST request
  POST(url: string, body: any = null, params: QueryParamDTO[] = [], containFiles: boolean = false) {
    // params
    let httpParams: HttpParams = this.ReturnParameterizedUrl(params);

    // headers
    const token = localStorage.getItem(LocalStorageEnum.Access_Token);
    let headers: HttpHeaders = new HttpHeaders();
    headers.append(`${containFiles ? 'Accept' : 'Content-Type'}`, 'application/json');
    headers = headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.append('Access-Control-Allow-Credentials', 'true');
    headers = headers.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
    headers = headers.append('Access-Control-Allow-Headers', '*');
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }

    return this.http.post(url, body, { observe: 'response', params: httpParams, headers })
      .pipe(
        catchError(err => {
          if (err.status <= 400 || err.status === 500) {
            const errSTR = JSON.stringify(err);
            const errJSON = JSON.parse(errSTR);
            return (errJSON._body);
          } else if (err.status === 401) { // 401 (not authorized)
            token ? this.setTokenExpiriation(true) : this.authService.logout();
          } else if (err.status === 403) { // 403 (Forbidden)
            this.router.navigate(['/auth/login']);
          }
        })
        , map((res: any) => res['body'] as ResponseDTO)
      );

  }

  // PUT request
  PUT(url: string, body: any = null, params: QueryParamDTO[] = [], containFiles: boolean = false) {
    // params
    let httpParams: HttpParams = this.ReturnParameterizedUrl(params);

    // headers
    const token = localStorage.getItem(LocalStorageEnum.Access_Token);
    let headers: HttpHeaders = new HttpHeaders();
    headers.append(`${containFiles ? 'Accept' : 'Content-Type'}`, 'application/json');
    headers = headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.append('Access-Control-Allow-Credentials', 'true');
    headers = headers.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
    headers = headers.append('Access-Control-Allow-Headers', '*');
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }

    return this.http.put(url, body, { observe: 'response', params: httpParams, headers })
      .pipe(
        catchError(err => {
          if (err.status <= 400 || err.status === 500) {
            const errSTR = JSON.stringify(err);
            const errJSON = JSON.parse(errSTR);
            return errJSON._body;
          } else if (err.status === 401) { // 401 (not authorized)
            token ? this.setTokenExpiriation(true) : this.authService.logout();
          } else if (err.status === 403) { // 403 (Forbidden)
            this.router.navigate(['/auth/login']);
          }
        })
        , map((res: any) => res['body'] as ResponseDTO)
      );

  }


  // DELETE request
  DELETE(url: string, params: QueryParamDTO[] = []) {

    // params
    let httpParams: HttpParams = this.ReturnParameterizedUrl(params);

    // headers
    const token = localStorage.getItem(LocalStorageEnum.Access_Token);
    let headers: HttpHeaders = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers = headers.append('Access-Control-Allow-Origin', '*');
    headers = headers.append('Access-Control-Allow-Credentials', 'true');
    headers = headers.append('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, PUT, OPTIONS');
    headers = headers.append('Access-Control-Allow-Headers', '*');
    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    return this.http.delete(url, { observe: 'response', params: httpParams, headers })
      .pipe(
        catchError(err => {
          if (err.status <= 400 || err.status === 500) {
            const errSTR = JSON.stringify(err);
            const errJSON = JSON.parse(errSTR);
            return (errJSON._body);
          } else if (err.status === 401) { // 401 (not authorized)
            token ? this.setTokenExpiriation(true) : this.authService.logout();
          } else if (err.status === 403) { // 403 (Forbidden)
            this.router.navigate(['/auth/login']);
          }
        })
        , map((res: any) => res['body'] as ResponseDTO)
      );
  }

  ExportToExcel(url: string) {
    const token = localStorage.getItem(LocalStorageEnum.Access_Token);
    return this.http.post(url, '', { headers: this.prepareRequestHeaders(), responseType: 'blob' })
      .pipe(
        catchError(err => {
          if (err.status <= 400 || err.status === 500) {
            // return _throw(new Error(String(err.status) + ' ' + err.statusText));
            const errSTR = JSON.stringify(err);
            const errJSON = JSON.parse(errSTR);
            return (errJSON._body);
          } else if (err.status === 401) { // 401 (not authorized)
            token ? this.setTokenExpiriation(true) : this.authService.logout();
          } else if (err.status === 403) { // 403 (Forbidden)
            this.router.navigate(['/auth/login']);
          }
        })
      );
  }

}
