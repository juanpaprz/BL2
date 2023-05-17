import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, ValidatorFn } from '@angular/forms';

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
  return (formGroup: AbstractControl):{ [key: string]: any } | null => {
    let valid = false;
    let array = formGroup.get('types')
    array?.controls.forEach((field) => {
      if (field.value) valid = true;
    });
    
    if (valid) return null
    else {
      formArray.setErrors({ notSelected: true })
      return { notSelected: true }
    }
  };
}

export function passwordMatch(password: string, confirmPassword: string):ValidatorFn {
  return (formGroup: AbstractControl):{ [key: string]: any } | null => {
    const passwordControl = formGroup.get(password);
    const confirmPasswordControl = formGroup.get(confirmPassword);
    
    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    if (
      confirmPasswordControl.errors &&
      !confirmPasswordControl.errors.passwordMismatch
    ) {
      return null;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true }
    } else {
      confirmPasswordControl.setErrors(null);
      return null;
    }
  };
}
