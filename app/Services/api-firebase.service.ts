import { Injectable } from '@angular/core';
import { Type } from '../Entities/Type';
import { Observable } from 'rxjs';
import { TypeCode } from '../Entities/TypeCode';
import { DbFirebaseService } from '../Services/db-firebase.service';
import { BodyCode } from '../Entities/BodyCode';

@Injectable()
export class ApiFirebaseService {
  constructor(private dbService: DbFirebaseService) {}

  getAllTypeCodes(): Observable<TypeCode[]> {
    return this.dbService.getTypeCodes();
  }

  addTypeCode(typeCode: TypeCode): Observable<TypeCode> {
    typeCode.id = this.generateId();
    return this.dbService.addTypeCode(typeCode);
  }

  getAllTypes(): Observable<Type[]> {
    return this.dbService.getTypes();
  }

  addType(type: Type): Observable<Type> {
    type.id = this.generateId();
    return this.dbService.addType(type);
  }

  getBodyCodes(): Observable<BodyCode[]> {
    return this.dbService.getBodyCodes();
  }

  addBodyCode(bodyCode: BodyCode): Observable<BodyCode> {
    bodyCode.id = this.generateId();
    return this.dbService.addBodyCode(bodyCode);
  }

  generateId() {
    const CHARS =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

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
