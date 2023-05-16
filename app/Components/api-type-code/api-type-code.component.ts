import { Component, OnInit } from '@angular/core';
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

  constructor(private apiService: ApiFirebaseService) {}

  ngOnInit() {
    this.getTypeCodes();
  }

  getTypeCodes() {
    this.apiService.getAllTypeCodes().subscribe({
      next: (response) => {
        if (response) this.typeCodes = Object.values(response);
      },
    });
  }

  addTypeCode() {
    this.apiService.addTypeCode(this.typeCode).subscribe({
      next: (response) => {
        console.log(response);
        this.typeCode = {
          id: '',
          code: '',
          name: '',
        };
        this.getTypeCodes();
      },
    });
  }

}
