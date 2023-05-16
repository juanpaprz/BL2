import { Component, Injectable, OnInit } from '@angular/core';
import { Type } from '../../Entities/Type';
import { TypeCode } from '../../Entities/TypeCode';
import { ApiFirebaseService } from '../../Services/api-firebase.service';

@Component({
  selector: 'app-api-type',
  templateUrl: './api-type.component.html',
  styleUrls: ['./api-type.component.css'],
})
@Injectable()
export class ApiTypeComponent implements OnInit {
  constructor(private dbService: ApiFirebaseService) {}

  TypeCodes: TypeCode[] = [];

  TypeCodeId: string = '';

  Type: Type = {
    id: '',
    name: '',
    code: '',
  };

  ngOnInit() {
    this.dbService.getAllTypeCodes().subscribe({
      next: (response) => {
        if (response) this.TypeCodes = Object.values(response);
      },
    });
  }

  addType() {
    let selectedTypeCode = this.TypeCodes.find((t) => t.id == this.TypeCodeId);

    if (!selectedTypeCode) return;

    this.Type.name = selectedTypeCode.name;
    this.Type.code = selectedTypeCode.code;

    this.dbService.addType(this.Type).subscribe({
      next: (response) => {
        console.log(response);
        this.TypeCodeId = '';
      },
    });
  }
}
