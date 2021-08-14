import { Injectable } from "@angular/core";
import { Donation } from "../Models/Donation";
import { HttpService } from "./http.service";

@Injectable({
    providedIn: 'root'
  })
  export class DonationService {
controllerName = "Donation";

    constructor(private http: HttpService) { 

    }
    getAllDonation() {
        return this.http.get(this.controllerName,"getAllDonation");
      } 
      insertDonation(donation:any) {
        return this.http.post(this.controllerName,"insertDonation",donation);
      }  
      updateDonation(donation:any) {
        return this.http.post(this.controllerName,"updateDonation",donation);
      } 
      deleteDonation(donation:any) {
        return this.http.post(this.controllerName,"deleteDonation",donation);
      } 
  }