import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AtLeastOneCheckbox,
  ValidationService,
} from '../../Services/validation.service';
import { BodyCode } from '../../Entities/BodyCode';
import { ApiFirebaseService } from '../../Services/api-firebase.service';
import { TypeCode } from '../../Entities/TypeCode';
import { FrontBody } from '../../Entities/FrontEntities/FrontBody';
import { Type } from '../../Entities/Type';

@Component({
  selector: 'app-api-body',
  templateUrl: './api-body.component.html',
  styleUrls: ['./api-body.component.css'],
})
export class ApiBodyComponent implements OnInit {
  form: FormGroup = new FormGroup([]);

  bodyCodes: BodyCode[] = [];
  typeCodes: TypeCode[] = [];

  bodyTypes: Type[] = [];
  body: FrontBody = {
    id: '',
    code: '',
    name: '',
    types: this.bodyTypes,
  };

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
            this.types.push(
              new FormGroup({
                value: new FormControl(false),
                id: new FormControl(typeCode.id),
              })
            );
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
      let selectedBody = this.bodyCodes.find(
        (b) => b.id == this.form.value.bodyId
      );

      if (!selectedBody) return;

      this.body.code = selectedBody.code;
      this.body.name = selectedBody.name;

      let checkTypes = this.form.get('types') as FormArray;
      let selectedTypes = checkTypes.controls.filter((t) => t.value.value);

      selectedTypes.forEach((selectedType) => {
        let type = this.typeCodes.find((t) => t.id == selectedType.value.id);
        if (type) this.body.types.push(type);
      });

      this.dbService.addBody(this.body); /*.subscribe({
        next: (response) => {
          this.form.patchValue({
            bodyid: '',
            types: [],
          });
          this.form = this.validateService.toucheFields(this.form, false);
        },
      });*/
    } else {
      console.log(this.form);
      this.form = this.validateService.toucheFields(this.form, true);
    }
  }
}
