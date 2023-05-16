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

  typeCodes: TypeCode[] = [];

  typeCodeId: string = '';

  types: Type[] = [];

  type: Type = {
    id: '',
    name: '',
    code: '',
  };

  headers: string[] = [];
  values: any[] = [];

  ngOnInit() {
    this.getTypeCodes();
    this.getTypes();
  }

  getTypes() {
    this.dbService.getAllTypes().subscribe({
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
    this.dbService.getAllTypeCodes().subscribe({
      next: (response) => {
        if (response) this.typeCodes = Object.values(response);
      },
    });
  }

  addType() {
    let selectedTypeCode = this.typeCodes.find((t) => t.id == this.typeCodeId);

    if (!selectedTypeCode) return;

    this.type.name = selectedTypeCode.name;
    this.type.code = selectedTypeCode.code;

    this.dbService.addType(this.type).subscribe({
      next: (response) => {
        console.log(response);
        this.typeCodeId = '';
        this.getTypes();
      },
    });
  }
}
