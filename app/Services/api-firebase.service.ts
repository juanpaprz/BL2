import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { TypeCode } from '../Entities/TypeCode';
import { DbFirebaseService } from '../Services/db-firebase.service';

@Injectable()
export class ApiFirebaseService {
  constructor(private dbService: DbFirebaseService) {}

  getAllTypeCodes(): Observable<TypeCode[]> {
    let typeCodes: TypeCode[] = [];

    return this.dbService.getTypeCodes();
  }

  addTypeCode(typeCode: TypeCode): Observable<TypeCode> {
    return this.dbService.addTypeCode(typeCode);
  }
}
