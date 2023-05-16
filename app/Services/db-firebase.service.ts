import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeCode } from '../Entities/TypeCode';
import { Observable } from 'rxjs';
import { Type } from '../Entities/Type';

const DBURL = 'https://bl2-weapons-default-rtdb.firebaseio.com/';

@Injectable({
  providedIn: 'root',
})
export class DbFirebaseService {
  constructor(private httpClient: HttpClient) {}

  getTypeCodes(): Observable<TypeCode[]> {
    return this.httpClient.get<TypeCode[]>(DBURL + 'TypeCode.json');
  }

  addTypeCode(typeCode: TypeCode): Observable<TypeCode> {
    return this.httpClient.put<TypeCode>(
      `${DBURL}TypeCode/${typeCode.id}.json`,
      typeCode
    );
  }

  addType(type: Type): Observable<Type> {
    return this.httpClient.put<TypeCode>(`${DBURL}Type/${type.id}.json`, type);
  }
}
