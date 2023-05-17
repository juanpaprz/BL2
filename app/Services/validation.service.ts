import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable()
export class ValidationService {

  constructor() { }

  isFieldValid(form: FormControl, field: string): boolean {
    return !form.get(field)?.valid && form.get(field)?.touched!;
  }

  setInvalidClass(form: FormControl, field: string) {
    return {
      'border-danger': this.isFieldValid(field),
    };
  }

}