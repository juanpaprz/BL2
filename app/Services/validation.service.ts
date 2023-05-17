import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

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
