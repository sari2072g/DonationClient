import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { fileURLToPath } from 'url';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  httpOptions: { headers: HttpHeaders; };
  constructor(private http: HttpClient) { }
  private baseURL = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=IBM&apikey=demo'; 
  get():Observable<any> {
    
    return this.http.get(this.baseURL);
  }
}
