import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InvestmentService {

  constructor(private http:HttpService) { }
  getTimeSesiedList():Observable<any>{
  return  this.http.get();
} 
  
  getInformationMenayaa(){
    return  this.http.get().pipe(map((response: Response) => {
      response['Meta Data'];
     }
       ));
     
  }
}
