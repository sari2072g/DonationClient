import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  httpOptions: { headers: HttpHeaders; };
  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:60659/api/';
  // flag= false;
  // paymentUrl="https://pci.zcredit.co.il/webcheckout/api/WebCheckout/CreateSession/";
  get(controller: string, functionApi:string , parameter: any = null): Observable<any> {
    if (parameter != null) {
      return this.http.get(this.baseUrl + controller + "/"+  functionApi , parameter);
    }
    return this.http.get(this.baseUrl + controller+ "/" +  functionApi);
  }
  post(controller: string,functionApi:string,  parameter: any = null): Observable<any> {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
      
    };
    if (parameter instanceof (Object)) {
      return this.http.post(this.baseUrl + controller + "/" + functionApi , parameter);
    }
    else {
      return this.http.post(this.baseUrl + controller + "/" +  functionApi + "/", parameter, this.httpOptions);
    }
  }
}
