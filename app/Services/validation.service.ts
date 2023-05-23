import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';

@Injectable()
export class ValidationService {
  constructor() {}

  isFieldValid(form: FormGroup, field: string): boolean {
    return !form.get(field)?.valid && form.get(field)?.touched!;
  }

  setInvalidClass(form: FormGroup, field: string) {
    return {
      'border-danger': this.isFieldValid(form, field),
    };
  }

  toucheFields(form: FormGroup, touche: boolean) {
    Object.keys(form.controls).forEach((field) => {
      const control = form.get(field);
      if (touche) control?.markAsTouched({ onlySelf: true });
      else control?.markAsUntouched({ onlySelf: true });
    });

    return form;
  }
}

export function AtLeastOneCheckbox(): ValidatorFn {
  return (formArray: AbstractControl): { [key: string]: any } | null => {
    let valid = false;
    let array = formArray as FormArray;
    array?.controls.forEach((field) => {
      if (field.get('value')?.value) valid = true;
    });
    return valid ? null : { NotOneChecked: true };
  };
}

export function NotRepeatedCode(codes: string[]): ValidatorFn {
  return (formControl: AbstractControl): { [key: string]: any } | null => {
    return !codes.includes(formControl.value) ? null : { RepeatedCode: true };
  };
}
