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

  bodyCodeForm: FormGroup = new FormGroup({
    code: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
  });

  invalid: boolean = false;

  ngOnInit() {
    this.getBodyCodes();
  }

  getBodyCodes() {
    this.dbService.getBodyCodes().subscribe({
      next: (response) => {
        if (response) this.bodyCodes = Object.values(response);
      },
    });
  }

  addBodyCode() {
    if (this.bodyCodeForm.valid) {
      this.invalid = false;

      this.bodyCode.code = this.bodyCodeForm.value.code;
      this.bodyCode.name = this.bodyCodeForm.value.name;

      /*this.dbService.addBodyCode(this.bodyCode).subscribe({
        next: (response) => {
          console.log(response);
          this.bodyCode = {
            id: '',
            name: '',
            code: '',
          };
          this.getBodyCodes();
        },
      });*/
    } else {
      console.log(this.bodyCodeForm)
      this.invalid = true;
    }
  }
}
