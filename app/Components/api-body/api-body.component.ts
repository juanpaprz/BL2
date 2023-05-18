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
  bodies: FrontBody[] = [];

  bodyTypes: Type[] = [];
  body: FrontBody = {
    id: '',
    code: '',
    name: '',
    types: this.bodyTypes,
  };

  headers: string[] = [];
  values: any[] = [];

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
    this.getBodies();
  }

  get types() {
    return this.form.get('types') as FormArray;
  }

  getBodies() {
    this.bodyService.getAllBodies().subscribe({
      next: (response) => {
        if (response) this.bodies = Object.values(response);

        if (this.bodies.length) {
          this.values = [];

          this.headers = Object.keys(this.bodies[0]);

          this.bodies.forEach((b) => {
            this.values.push([b.code, 'id: ' + b.id, b.name, b.types[0].name]);
          });
          this.values = this.values.sort((a, b) => (a > b ? 1 : -1));
        }
      },
    });
  }

  getBodyCodes() {
    this.bodyService.getAllBodyCodes().subscribe({
      next: (response) => {
        if (response)
          this.bodyCodes = Object.values(response).sort((a, b) =>
            a.name > b.name ? 1 : -1
          );
      },
    });
  }

  getTypeCodes() {
    this.typeService.getAllTypeCodes().subscribe({
      next: (response) => {
        if (response)
          this.typeCodes = Object.values(response).sort((a, b) =>
            a.name > b.name ? 1 : -1
          );

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

      this.body.types = [];

      selectedTypes.forEach((selectedType) => {
        let type = this.typeCodes.find((t) => t.id == selectedType.value.id);
        if (type) this.body.types.push(type);
      });

      this.bodyService.addBody(this.body).subscribe({
        next: (response) => {
          console.log(response);
          this.clearForm();
          this.form = this.validateService.toucheFields(this.form, false);
          this.getBodies();
        },
      });
    } else {
      this.form = this.validateService.toucheFields(this.form, true);
      console.log(this.form);
    }
  }
}
