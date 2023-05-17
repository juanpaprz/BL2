import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AtLeastOneCheckbox,
  ValidationService,
} from '../../Services/validation.service';
import { BodyCode } from '../../Entities/BodyCode';
import { ApiFirebaseService } from '../../Services/api-firebase.service';
import { TypeCode } from '../../Entities/TypeCode';

@Component({
  selector: 'app-api-body',
  templateUrl: './api-body.component.html',
  styleUrls: ['./api-body.component.css'],
})
export class ApiBodyComponent implements OnInit {
  form: FormGroup = new FormGroup([]);

  bodyCodes: BodyCode[] = [];
  typeCodes: TypeCode[] = [];

  constructor(
    private dbService: ApiFirebaseService,
    private validateService: ValidationService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      bodyId: new FormControl('', Validators.required),
      types: new FormArray([], AtLeastOneCheckbox()),
    });

    this.getBodyCodes();
    this.getTypeCodes();
  }

  get types() {
    return this.form.get('types') as FormArray;
  }

  getBodyCodes() {
    this.dbService.getAllBodyCodes().subscribe({
      next: (response) => {
        if (response) this.bodyCodes = Object.values(response);
      },
    });
  }

  getTypeCodes() {
    this.dbService.getAllTypeCodes().subscribe({
      next: (response) => {
        if (response) this.typeCodes = Object.values(response);

        if (this.typeCodes.length) {
          this.typeCodes.forEach((typeCode) => {
            this.types.push(new FormControl(false));
          });
        }
      },
    });
  }

  isFieldValid(field: string): boolean {
    return this.validateService.isFieldValid(this.form, field);
  }

  setInvalidClass(field: string) {
    return this.validateService.setInvalidClass(this.form, field);
  }

  addBody() {
    if (this.form.valid) {
    } else {
      console.log(this.form);
      this.validateService.toucheFields(this.form, true);
    }
  }
}
