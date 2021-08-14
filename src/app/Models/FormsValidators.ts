import { AbstractControl, ValidatorFn } from "@angular/forms";

export class FormsValidators {
  static hasValue(control: AbstractControl): boolean {
    const value = control.value;
    if (value === undefined || value === null) {
      return false;
    }
    return value !== '' ? true : false;
  }
  static letters: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
    if (!FormsValidators.hasValue(control)) {
      return null;
    } 
    return /^[a-z\u0590-\u05fe ,.'-]+$/i.test(control.value) ? null : { letters: true };
  }
  static digitsOrfloats: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
    if (!FormsValidators.hasValue(control)) {
      return null;
    }
    return /^[0-9]{1,9}(\.[0-9]{0,9})?$/.test(control.value) ? null : { digitsOrfloats: true };
  }
  }