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
    this.TypeCode.id = this.generateId();

    this.apiService.addTypeCode(this.TypeCode).subscribe({
      next: (response) => {
        console.log(response);
        this.getTypeCodes();
      },
    });
  }

  generateId() {
    const CHARS =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@?';

    let id = '';
    for (let i = 0; i < 18; i++) {
      id += CHARS[Math.floor(Math.random() * CHARS.length)];
    }

    id = [
      id.slice(0, 3),
      '-',
      id.slice(3, 6),
      '-',
      id.slice(6, 9),
      '-',
      id.slice(9, 12),
      '-',
      id.slice(12, 15),
      '-',
      id.slice(15, 18),
    ].join('');

    return id;
  }
}
