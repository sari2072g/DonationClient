import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BasePanelMenuItem } from 'primeng/panelmenu';
import { Donation } from 'src/app/Models/Donation';
import { DonationService } from 'src/app/services/donation.service';
import { DialogService } from 'primeng/dynamicdialog'

import { State } from 'src/app/Models/state.enum';
import { AddDonationComponent } from '../add-donation/add-donation.component';
@Component({
  selector: 'app-donation-grid',
  templateUrl: './donation-grid.component.html',
  styleUrls: ['./donation-grid.component.css']
})
export class DonationGridComponent implements OnInit {
donationListItem:any []=[];
    a:MenuItem
  isClicable: boolean=false;
  state;
  identity ="kl1299";//ליצור בתשתית שליפה של שם המשתמש הפועל על המערכת וזה יהיה ההשוואה על מנת לבדוק ממול יוצר הרשומה בטבלה
  constructor(private donationService: DonationService, private dialogService: DialogService,) { }

  ngOnInit(): void {
   this. initPanelByDonation();
   
    
  
}
  initPanelByDonation() {
    this.donationService.getAllDonation().subscribe(donationList=>{
      this.donationListItem= [];
donationList.forEach(element => {
  
  this.donationListItem.push( Object.assign({ donation:element ,show :false }));
      });
});

   
  }
  openDonationFormDialog(){

    const addCheshbonDialog = this.dialogService.open(AddDonationComponent, {
      header: "הוספת דיווח על עמותה",
      width: '800px',
      data:{state: State.ADDED},
      contentStyle: {"min-height": "400px", "overflow": "auto","direction": "rtl;"},
      baseZIndex: 10000,
  });
  addCheshbonDialog.onClose.subscribe(x=>{
    this. initPanelByDonation();
  })
  }
  openOrginalDonationForm(event:any){
 const selected =    this.donationListItem.find(x=>x.donation ==event);
 selected.show =!selected.show;
 this.state=State.ORGINAL;
    this.isClicable =selected.show;
  }
  openEditDonationForm(event:any){
    const selected =    this.donationListItem.find(x=>x.donation ==event);
    selected.show =!selected.show;
    this.state=State.UPDATED;
  }
  deleteDonation(event:any){
    this.donationService.deleteDonation(event).subscribe(isSuccess => {
      this.initPanelByDonation();
    });
  }
  
}


