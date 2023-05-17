import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../Services/validation.service';
import { TypeCode } from '../../Entities/TypeCode';
import { ApiFirebaseService } from '../../Services/api-firebase.service';

@Component({
  selector: 'app-api-type-code',
  templateUrl: './api-type-code.component.html',
  styleUrls: ['./api-type-code.component.css'],
})
export class ApiTypeCodeComponent implements OnInit {
  typeCodes: TypeCode[] = [];

  typeCode: TypeCode = {
    id: '',
    code: '',
    name: '',
  };

  form: FormGroup = new FormGroup({});

  constructor(
    private dbService: ApiFirebaseService,
    private validateService: ValidationService
  ) {}

  ngOnInit() {
    this.getTypeCodes();

    this.form = new FormGroup({
      code: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(4),
      ]),
      name: new FormControl('', Validators.required),
    });
  }

  getTypeCodes() {
    this.dbService.getAllTypeCodes().subscribe({
      next: (response) => {
        if (response) this.typeCodes = Object.values(response);
      },
    });
  }

  isFieldValid(field: string): boolean {
    return this.validateService.isFieldValid(this.form, field);
  }

  setInvalidClass(field: string) {
    return this.validateService.setInvalidClass(this.form, field);
  }

  addTypeCode() {
    if (this.form.valid) {
      this.typeCode.code = this.form.value.code;
      this.typeCode.name = this.form.value.name;

      this.dbService.addBodyCode(this.typeCode).subscribe({
        next: (response) => {
          console.log(response);
          this.form.patchValue({
            code: '',
            name: '',
          });
          this.form = this.validateService.toucheFields(this.form, false);
          this.getTypeCodes();
        },
      });
    } else {
      console.log(this.form);
      this.form = this.validateService.toucheFields(this.form, true);
    }
  }
}
