import { Injectable } from '@angular/core';
import { Type } from '../../Entities/Type';
import { TypeCode } from '../../Entities/TypeCode';
import { ApiFirebaseService } from '../../Services/api-firebase.service';
import { DbFirebaseService } from '../../Services/db-firebase.service';
import { Observable } from 'rxjs';

@Injectable()
export class TypeControllerService {
  constructor(
    private dbService: DbFirebaseService,
    private apiService: ApiFirebaseService
  ) {}

  getAllTypeCodes(): Observable<TypeCode[]> {
    return this.dbService.getTypeCodes();
  }

  addTypeCode(typeCode: TypeCode): Observable<TypeCode> {
    typeCode.id = this.apiService.generateId();
    return this.dbService.addTypeCode(typeCode);
  }

  getAllTypes(): Observable<Type[]> {
    return this.dbService.getTypes();
  }

  addType(type: Type): Observable<Type> {
    type.id = this.apiService.generateId();
    return this.dbService.addType(type);
  }
}
