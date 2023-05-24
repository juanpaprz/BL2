import { Injectable } from '@angular/core';
import { BarrelCode } from '../../Entities/BarrelCode';
import { forkJoin, map, Observable } from 'rxjs';
import { ApiFirebaseService } from '../../Services/api-firebase.service';
import { DbFirebaseService } from '../../Services/db-firebase.service';
import { FrontBarrel } from '../../Entities/FrontEntities/FrontBarrel';
import { Barrel } from '../../Entities/Barrel';
import { FrontBody } from '../../Entities/FrontEntities/FrontBody';
import { FrontRarity } from '../../Entities/FrontEntities/FrontRarity';

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

  getAllBarrels(): Observable<FrontBarrel[]> {
    return forkJoin([
      this.dbService.getBarrels(),
      this.dbService.getTypeCodes(),
      this.dbService.getBodyCodes(),
      this.dbService.getRarityCodes(),
    ]).pipe(
      map((response) => {
        let frontBarrels: FrontBarrel[] = [];

        if (!response[0] || !response[1] || !response[2] || !response[3])
          return frontBarrels;

        let typeCodes = Object.values(response[1]);
        let bodyCodes = Object.values(response[2]);
        let rarityCodes = Object.values(response[3]);

        Object.values(response[0]).forEach((barrel) => {
          let type = typeCodes.find((t) => t.id == barrel.typeId);

          if (!type) return;

          let body = bodyCodes.find((b) => b.id == barrel.bodyId);

          if (!body) return;

          let frontBody: FrontBody = {
            id: body.id,
            code: body.code,
            name: body.name,
            types: [type],
          };

          let rarity = rarityCodes.find((r) => r.id == barrel.rarityId);

          if (!rarity) return;

          let frontRarity: FrontRarity = {
            id: rarity.id,
            code: rarity.code,
            name: rarity.name,
            level: rarity.level,
            color: rarity.color,
            colorTxt: rarity.colorTxt,
            bodies: [frontBody],
          };

          let frontBarrel: FrontBarrel = {
            id: barrel.id,
            code: barrel.code,
            name: barrel.name,
            rarities: [frontRarity],
          };

          frontBarrels.push(frontBarrel);
        });

        return frontBarrels;
      })
    );
  }
}
