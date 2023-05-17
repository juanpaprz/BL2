import { Component, OnInit } from '@angular/core';
import { ApiFirebaseService } from '../../Services/api-firebase.service';
import { BodyCode } from '../../Entities/BodyCode';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-api-body-code',
  templateUrl: './api-body-code.component.html',
  styleUrls: ['./api-body-code.component.css'],
})
export class ApiBodyCodeComponent implements OnInit {
  constructor(private dbService: ApiFirebaseService) {}

  bodyCode: BodyCode = {
    id: '',
    name: '',
    code: '',
  };

  bodyCodes: BodyCode[] = [];

  form: FormGroup = new FormGroup({});

  ngOnInit() {
    this.getBodyCodes();

    this.form = new FormGroup({
      code: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
      ]),
      name: new FormControl('', Validators.required),
    });
  }

  getBodyCodes() {
    this.dbService.getBodyCodes().subscribe({
      next: (response) => {
        if (response) this.bodyCodes = Object.values(response);
      },
    });
  }

  isFieldValid(field: string): boolean {
    return !this.form.get(field)?.valid && this.form.get(field)?.touched!;
  }

  setInvalidClass(field: string) {
    return {
      'border-danger': this.isFieldValid(field),
    };
  }

  toucheFields(touche: boolean) {
    Object.keys(this.form.controls).forEach((field) => {
      const control = this.form.get(field);
      if (touche)
        control?.markAsTouched({ onlySelf: true });
      else
        control?.markAsUntouched({ onlySelf: true });
    });
  }

  addBodyCode() {
    if (this.form.valid) {
      this.bodyCode.code = this.form.value.code;
      this.bodyCode.name = this.form.value.name;

      this.dbService.addBodyCode(this.bodyCode).subscribe({
        next: (response) => {
          console.log(response);
          this.form.patchValue({
            code: '',
            name: '',
          });
          this.toucheFields(false)
          this.getBodyCodes();
        },
      });
    } else {
      console.log(this.form);
      this.toucheFields(true)
    }
  }
}
