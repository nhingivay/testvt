import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get('http://202.182.111.45:8081/v1/accounts');
  }
  // SERVICE GET
  Get = (url: string) => {
    return this.httpClient.get(url).pipe(
      map((res: any) => {
        return res;
      })
    );
  };
  // SERVICE POST
  Post = (url: string, body: any) => {
    const options = {
      headers: new HttpHeaders({ Author: 'token' }),
      body: body,
    };
    return this.httpClient.post<any>(url, body, options).pipe(
      map((response: any) => {
        return response;
      })
    );
  };
  // SERVICE POST
  Put = (url: string, body: any) => {
    const options = {
      headers: new HttpHeaders({ Author: 'token' }),
      body: body,
    };
    return this.httpClient.put<any>(url, body, options).pipe(
      map((response: any) => {
        return response;
      })
    );
  };
  // SERVICE POST
  Del = (url: string) => {
    const options = {
      headers: new HttpHeaders({ Author: 'token' }),
    };
    return this.httpClient.delete<any>(url, options).pipe(
      map((response: any) => {
        return response;
      })
    );
  };
}
