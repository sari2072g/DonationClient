import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { element } from 'protractor';
import { Donation } from 'src/app/Models/Donation';
import { FormsValidators } from 'src/app/Models/FormsValidators';
import { State } from 'src/app/Models/state.enum';
import { DonationService } from 'src/app/services/donation.service';

@Component({
  selector: 'app-add-donation',
  templateUrl: './add-donation.component.html',
  styleUrls: ['./add-donation.component.css']
})
export class AddDonationComponent implements OnInit {
  currencyList: any[] = [];
  sugYeshutCountryList: any[] = [];
  donationForm: FormGroup;
  @Input() isclicable: boolean;
  @Input() donationdata;
  @Input() currentState;
  disable: boolean
  States = State;
  selectedcurrency: any=[];
  selectedsugYeshutCountry: any=[];
  message: string;
  isSuccess: boolean=null;
  
  constructor(private donationService: DonationService, private fb: FormBuilder, public config: DynamicDialogConfig,) {
    this.initializeData()
  }

  ngOnInit(): void {
    this.buildDonationForm()
  }
  initializeData() {
    if(this.config && this.config.data){
     this.currentState = this.config.data.state ;
    }
    this.currencyList = [ { value: 1, label: "שקל" }, { value: 2, label: "דולר" }];
    this.sugYeshutCountryList = [ { value: 1, label: "מדינה זרה" }, { value: 2, label: "מדינה קיימת" }]
  }
  buildDonationForm() {
    debugger
    switch (this.currentState) {
      case this.States.ORGINAL:
        case this.States.UPDATED:
        this.donationForm = this.fb.group(this.donationdata);
      
        this.donationForm = this.fb.group(this.donationdata);
        this.disable = this.currentState == this.States.ORGINAL ? true : null;
        this.selectedcurrency = this.currencyList.find(c => c.value == this.donationdata.codeSugCurrency)
        this.selectedsugYeshutCountry = this.sugYeshutCountryList.find(s => s.value == this.donationdata.codeSugYeshut)
        this.donationForm.get('codeSugCurrency').setValue(this.selectedcurrency);
        this.donationForm.get('codeSugYeshut').setValue(this.selectedsugYeshutCountry);
        if (this.currentState == this.States.ORGINAL) {
          this.donationForm.get('codeSugCurrency').setValue(this.selectedcurrency.label);
          this.donationForm.get('codeSugYeshut').setValue(this.selectedsugYeshutCountry.label);
        }
        debugger
    
        break;
        case this.States.ADDED:
          this.donationForm = this.fb.group(new Donation());
          break;
    }
    this.setValidators();
    this.donationForm.updateValueAndValidity();
  }
  setValidators() { 
    this.donationForm.get('yeshutName').setValidators([Validators.compose([Validators.required, FormsValidators.letters])]);
    this.donationForm.get('countDonation').setValidators([Validators.compose([Validators.required, FormsValidators.digitsOrfloats])]);

    this.donationForm.get('codeSugYeshut').setValidators([Validators.required]);

    this.donationForm.get('reasonDonation').setValidators([Validators.compose([Validators.required, FormsValidators.letters])]);

    this.donationForm.get('codeSugCurrency').setValidators([Validators.required]);

    this.donationForm.get('conversionRate').setValidators([Validators.required]);
    
    this.donationForm.get('conditionDonation').setValidators([FormsValidators.letters]);

    
  }
  validateForm(form: any) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      control.markAsDirty({ onlySelf: true });
      if ( control instanceof FormGroup) {
        this.validateForm(control);
      }
    });
    form.updateValueAndValidity({
      onlySelf: false,
      emitEvent: true
    });
    //this.changeDetector.markForCheck();
    return form.valid;
  }
  Save(currentState) {
    debugger
    if (this.validateForm(this.donationForm)) {
      debugger
      const donationReq = new Donation();
      // donationReq.DonationId;
      if (this.currentState == this.States.UPDATED) donationReq.donationId = this.donationdata.donationId;
      donationReq.yeshutName = this.donationForm.controls.yeshutName.value;
      donationReq.countDonation = Number(this.donationForm.controls.countDonation.value);
      donationReq.codeSugYeshut = this.donationForm.controls.codeSugYeshut.value;
      donationReq.reasonDonation = this.donationForm.controls.reasonDonation.value;
      donationReq.conditionDonation = this.donationForm.controls.conditionDonation.value;
      donationReq.codeSugCurrency = this.donationForm.controls.codeSugCurrency.value;
      donationReq.conversionRate = Number(this.donationForm.controls.conversionRate.value);
      switch (currentState) {
        case this.States.UPDATED:
          this.donationService.updateDonation(donationReq).subscribe(isSuccess => {
            debugger
            if(isSuccess){
              this.isSuccess=true;
              this.message ="שמירה בוצעה בהצלחה"
            }
            else{
              this.isSuccess=false;
              this.message ="שמירה נכשלה "
            }
          });
          break;
        case this.States.ADDED:
          this.donationService.insertDonation(donationReq).subscribe(isSuccess => {
            debugger
            if(isSuccess){
              this.isSuccess=true;
              this.message ="שמירה בוצעה בהצלחה"
            }
            else{
              this.isSuccess=false;
              this.message ="שמירה נכשלה "
            }
          });
          break;
      }

    }
  }
  reset() {
    this.donationForm.reset();
  }
}
