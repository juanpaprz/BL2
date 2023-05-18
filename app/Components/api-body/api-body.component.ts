import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AtLeastOneCheckbox,
  ValidationService,
} from '../../Services/validation.service';
import { BodyCode } from '../../Entities/BodyCode';
import { TypeCode } from '../../Entities/TypeCode';
import { FrontBody } from '../../Entities/FrontEntities/FrontBody';
import { Type } from '../../Entities/Type';
import { BodyControllerService } from '../../Services/Controllers/body-controller.service';
import { TypeControllerService } from '../../Services/Controllers/type-controller.service';

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
    private validateService: ValidationService,
    private bodyService: BodyControllerService,
    private typeService: TypeControllerService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      bodyId: new FormControl('', Validators.required),
      types: new FormArray([], AtLeastOneCheckbox()),
    });

    this.getBodyCodes();
    this.getTypeCodes();

    this.bodyService.getAllBodies();
  }

  get types() {
    return this.form.get('types') as FormArray;
  }

  getBodyCodes() {
    this.bodyService.getAllBodyCodes().subscribe({
      next: (response) => {
        if (response) this.bodyCodes = Object.values(response);
      },
    });
  }

  getTypeCodes() {
    this.typeService.getAllTypeCodes().subscribe({
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

  clearForm() {
    let clearTypes: { [key: string]: any } = [];
    this.typeCodes.forEach((typeCode) => {
      clearTypes.push({ value: false, id: typeCode.id });
    });

    this.form.patchValue({
      bodyId: '',
      types: clearTypes,
    });
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

      this.bodyService.addBody(this.body).subscribe({
        next: (response) => {
          console.log(response);
          this.clearForm();
          this.form = this.validateService.toucheFields(this.form, false);
        },
      });
    } else {
      this.form = this.validateService.toucheFields(this.form, true);
      console.log(this.form);
    }
  }
}
