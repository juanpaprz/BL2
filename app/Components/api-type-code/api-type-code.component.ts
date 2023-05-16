import { Component, OnInit } from '@angular/core';
import { TypeCode } from '../../Entities/TypeCode';
import { ApiFirebaseService } from '../../Services/api-firebase.service';

@Component({
  selector: 'app-api-type-code',
  templateUrl: './api-type-code.component.html',
  styleUrls: ['./api-type-code.component.css'],
})
export class ApiTypeCodeComponent implements OnInit {
  TypeCodes: TypeCode[] = [];

  TypeCode: TypeCode = {
    id: '',
    code: '',
    name: '',
  };

  constructor(private apiService: ApiFirebaseService) {}

  ngOnInit() {
    this.getTypeCodes();
  }

  getTypeCodes() {
    this.apiService.getAllTypeCodes().subscribe({
      next: (response) => {
        if (response) this.TypeCodes = Object.values(response);
      },
    });
  }

  addTypeCode() {
    this.apiService.addTypeCode(this.TypeCode).subscribe({
      next: (response) => {
        console.log(response);
        this.TypeCode = {
          id: '',
          code: '',
          name: '',
        };
        this.getTypeCodes();
      },
    });
  }

}
