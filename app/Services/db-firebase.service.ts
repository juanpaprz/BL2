import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeCode } from '../Entities/TypeCode';
import { Observable } from 'rxjs';
import { Type } from '../Entities/Type';
import { BodyCode } from '../Entities/BodyCode';

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

  getTypes(): Observable<Type[]> {
    return this.httpClient.get<Type[]>(DBURL + 'Type.json');
  }

  addType(type: Type): Observable<Type> {
    return this.httpClient.put<TypeCode>(`${DBURL}Type/${type.id}.json`, type);
  }

  getBodyCodes(): Observable<BodyCode[]> {
    return this.httpClient.get<BodyCode[]>(DBURL + 'BodyCode.json');
  }

  addBodyCode(bodyCode: BodyCode): Observable<BodyCode> {
    return this.httpClient.put<BodyCode>(
      `${DBURL}BodyCode/${bodyCode.id}.json`,
      bodyCode
    );
  }
}
