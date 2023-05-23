import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BarrelCode } from '../../Entities/BarrelCode';
import { BarrelControllerService } from '../../Services/Controllers/barrel-controller.service';
import {
  NotRepeatedCode,
  ValidationService,
} from '../../Services/validation.service';

@Component({
  selector: 'app-api-barrel-code',
  templateUrl: './api-barrel-code.component.html',
  styleUrls: ['./api-barrel-code.component.css'],
})
export class ApiBarrelCodeComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  barrelCodes: BarrelCode[] = [];

  barrelCode: BarrelCode = {
    code: '',
    id: '',
    name: '',
  };

  disableButton: Boolean = false;

  constructor(
    private validateService: ValidationService,
    private barrelService: BarrelControllerService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      code: new FormControl('', [
        Validators.required,
        Validators.maxLength(4),
        Validators.minLength(4),
      ]),
      name: new FormControl('', Validators.required),
    });

    this.getBarrelCodes();
  }

  getBarrelCodes() {
    this.barrelService.getAllBarrelCodes().subscribe({
      next: (response) => {
        if (response)
          this.barrelCodes = Object.values(response).sort((a, b) =>
            a.name > b.name ? 1 : -1
          );

        if (!this.barrelCodes.length) return;

        let codes: string[] = [];

        this.barrelCodes.forEach((b) => {
          codes.push(b.code);
        });

        this.form.controls['code'].addValidators(NotRepeatedCode(codes));
      },
    });
  }

  isFieldValid(field: string): boolean {
    return this.validateService.isFieldValid(this.form, field);
  }

  setInvalidClass(field: string) {
    return this.validateService.setInvalidClass(this.form, field);
  }

  addBarrelCode() {
    if (this.form.valid) {
      this.disableButton = true;
      this.barrelCode.code = this.form.value.code;
      this.barrelCode.name = this.form.value.name;

      this.barrelService.addBarrelCode(this.barrelCode).subscribe({
        next: (response) => {
          console.log(response);
          this.form.patchValue({
            code: '',
            name: '',
          });
          this.validateService.toucheFields(this.form, false);
          this.getBarrelCodes();
          this.disableButton = false;
        },
      });
    } else {
      this.validateService.toucheFields(this.form, true);
    }
  }

  /*submitAll() {
    this.disableButton = true;
    this.barrelService.addAllBarrelsTemp().subscribe({
      next: (response) => {
        console.log(response);
      },
    });
  }*/
}
