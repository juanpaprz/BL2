import { Injectable } from '@angular/core';
import { Type } from '../Entities/Type';
import { catchError, forkJoin, Observable, of, tap } from 'rxjs';
import { TypeCode } from '../Entities/TypeCode';
import { DbFirebaseService } from '../Services/db-firebase.service';
import { BodyCode } from '../Entities/BodyCode';
import { FrontBody } from '../Entities/FrontEntities/FrontBody';
import { Body } from '../Entities/Body';

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

  getAllBodyCodes(): Observable<BodyCode[]> {
    return this.dbService.getBodyCodes();
  }

  addBodyCode(bodyCode: BodyCode): Observable<BodyCode> {
    bodyCode.id = this.generateId();
    return this.dbService.addBodyCode(bodyCode);
  }

  addBody(frontBody: FrontBody) {
    let bodies: Body[] = [];

    let sendBody: Body = {
      code: '',
      id: '',
      name: '',
      typeId: '',
    };
    frontBody.types.forEach((type) => {
      sendBody.code = frontBody.code;
      sendBody.name = frontBody.name;
      sendBody.id = this.generateId();
      sendBody.typeId = type.id;

      bodies.push(sendBody);

      sendBody = {
        code: '',
        id: '',
        name: '',
        typeId: '',
      };
    });

    let observables: Observable<Body>[] = [];

    bodies.forEach((body) => {
      observables.push(
        this.dbService.addBody(body).pipe(
          tap(),
          catchError((e) => {
            e++;
            return of(e);
          })
        )
      );
    });

    return forkJoin(observables);
  }

  getAllBodies(){
    
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
