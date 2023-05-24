import { Injectable } from '@angular/core';
import { BarrelCode } from '../../Entities/BarrelCode';
import { forkJoin, Observable } from 'rxjs';
import { ApiFirebaseService } from '../../Services/api-firebase.service';
import { DbFirebaseService } from '../../Services/db-firebase.service';
import { FrontBarrel } from '../../Entities/FrontEntities/FrontBarrel';
import { Barrel } from '../../Entities/Barrel';

@Injectable()
export class BarrelControllerService {
  constructor(
    private dbService: DbFirebaseService,
    private apiService: ApiFirebaseService
  ) {}

  addBarrelCode(barrelCode: BarrelCode): Observable<BarrelCode> {
    barrelCode.id = this.apiService.generateId();
    return this.dbService.addBarrelCode(barrelCode);
  }

  getAllBarrelCodes(): Observable<BarrelCode[]> {
    return this.dbService.getBarrelCodes();
  }

  addBarrel(frontBarrel: FrontBarrel) {
    let barrels: Barrel[] = [];

    frontBarrel.rarities.forEach((rarity) => {
      rarity.bodies.forEach((body) => {
        body.types.forEach((type) => {
          let barrel: Barrel = {
            id: this.apiService.generateId(),
            code: frontBarrel.code,
            name: frontBarrel.name,
            rarityId: rarity.id,
            bodyId: body.id,
            typeId: type.id,
          };

          barrels.push(barrel);
        });
      });
    });

    let observables: Observable<Barrel>[] = [];

    barrels.forEach((barrel) => {
      observables.push(this.dbService.addBarrel(barrel));
    });

    return forkJoin(observables);
  }
}
