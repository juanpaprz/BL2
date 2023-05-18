import { Component, OnInit } from '@angular/core';
import { BodyCode } from '../../Entities/BodyCode';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../Services/validation.service';
import { BodyControllerService } from '../../Services/Controllers/body-controller.service';

@Component({
  selector: 'app-api-body-code',
  templateUrl: './api-body-code.component.html',
  styleUrls: ['./api-body-code.component.css'],
})
export class ApiBodyCodeComponent implements OnInit {
  constructor(
    private validateService: ValidationService,
    private bodyService: BodyControllerService
  ) {}

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
    this.bodyService.getAllBodyCodes().subscribe({
      next: (response) => {
        if (response) this.bodyCodes = Object.values(response);
      },
    });
  }

  isFieldValid(field: string): boolean {
    return this.validateService.isFieldValid(this.form, field);
  }

  setInvalidClass(field: string) {
    return this.validateService.setInvalidClass(this.form, field);
  }

  addBodyCode() {
    if (this.form.valid) {
      this.bodyCode.code = this.form.value.code;
      this.bodyCode.name = this.form.value.name;

      this.bodyService.addBodyCode(this.bodyCode).subscribe({
        next: (response) => {
          console.log(response);
          this.form.patchValue({
            code: '',
            name: '',
          });
          this.form = this.validateService.toucheFields(this.form, false);
          this.getBodyCodes();
        },
      });
    } else {
      console.log(this.form);
      this.form = this.validateService.toucheFields(this.form, true);
    }
  }
}
