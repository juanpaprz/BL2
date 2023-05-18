import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../Services/validation.service';
import { Type } from '../../Entities/Type';
import { TypeCode } from '../../Entities/TypeCode';
import { TypeControllerService } from '../../Services/Controllers/type-controller.service';

@Component({
  selector: 'app-api-type',
  templateUrl: './api-type.component.html',
  styleUrls: ['./api-type.component.css'],
})
@Injectable()
export class ApiTypeComponent implements OnInit {
  constructor(
    private validateService: ValidationService,
    private typeService: TypeControllerService
  ) {}

  typeCodes: TypeCode[] = [];

  types: Type[] = [];

  type: Type = {
    id: '',
    name: '',
    code: '',
  };

  form: FormGroup = new FormGroup({});

  headers: string[] = [];
  values: any[] = [];

  ngOnInit() {
    this.getTypeCodes();
    this.getTypes();

    this.form = new FormGroup({
      codeId: new FormControl('', Validators.required),
    });
  }

  getTypes() {
    this.typeService.getAllTypes().subscribe({
      next: (response) => {
        if (response) this.types = Object.values(response);

        if (this.types.length) {
          this.headers = Object.keys(this.types[0]);

          this.types.forEach((type) => {
            this.values.push([type.code, 'id: ' + type.id, type.name]);
          });
        }
      },
    });
  }

  getTypeCodes() {
    this.typeService.getAllTypeCodes().subscribe({
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

  addType() {
    if (this.form.valid) {
      let selectedTypeCode = this.typeCodes.find(
        (t) => t.id == this.form.value.codeId
      );

      if (!selectedTypeCode) return;

      this.type.name = selectedTypeCode.name;
      this.type.code = selectedTypeCode.code;

      this.typeService.addType(this.type).subscribe({
        next: (response) => {
          console.log(response);
          this.form.patchValue({
            codeId: '',
          });
          this.getTypes();
        },
      });
    } else {
      this.form = this.validateService.toucheFields(this.form, true);
    }
  }
}
