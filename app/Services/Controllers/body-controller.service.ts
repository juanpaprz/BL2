import { Injectable } from '@angular/core';
import { Body } from '../../Entities/Body';
import { BodyCode } from '../../Entities/BodyCode';
import { FrontBody } from '../../Entities/FrontEntities/FrontBody';
import { ApiFirebaseService } from '../../Services/api-firebase.service';
import { forkJoin, map, Observable, of, tap } from 'rxjs';
import { DbFirebaseService } from '../../Services/db-firebase.service';
import { TypeCode } from '../../Entities/TypeCode';

@Injectable()
export class BodyControllerService {
  constructor(
    private dbService: DbFirebaseService,
    private apiService: ApiFirebaseService
  ) {}

  getAllBodyCodes(): Observable<BodyCode[]> {
    return this.dbService.getBodyCodes();
  }

  addBodyCode(bodyCode: BodyCode): Observable<BodyCode> {
    bodyCode.id = this.apiService.generateId();
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
      sendBody.id = this.apiService.generateId();
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
      observables.push(this.dbService.addBody(body));
    });

    return forkJoin(observables);
  }
  getAllBodies(): Observable<FrontBody[]> {
    return forkJoin([
      this.dbService.getTypeCodes(),
      this.dbService.getBodies(),
    ]).pipe(
      map((response) => {
        let typeCodes = Object.values(response[0]);
        let frontBodies: FrontBody[] = [];

        if (!response[1]) return frontBodies;

        Object.values(response[1]).forEach((b) => {
          let frontBody: FrontBody = {
            id: b.id,
            code: b.code,
            name: b.name,
            types: [typeCodes.find((t) => t.id == b.typeId)!],
          };
          frontBodies.push(frontBody);
        });
        return frontBodies;
      })
    );
  }
}
