import { Injectable } from '@angular/core';
import { RarityCode } from '../../Entities/RarityCode';
import { ApiFirebaseService } from '../../Services/api-firebase.service';
import { DbFirebaseService } from '../../Services/db-firebase.service';
import { forkJoin, map, Observable } from 'rxjs';
import { FrontRarity } from '../../Entities/FrontEntities/FrontRarity';
import { Rarity } from '../../Entities/Rarity';
import { FrontBody } from '../../Entities/FrontEntities/FrontBody';

@Injectable()
export class RarityControllerService {
  constructor(
    private dbService: DbFirebaseService,
    private apiService: ApiFirebaseService
  ) {}

  getAllRarityCodes(): Observable<RarityCode[]> {
    return this.dbService.getRarityCodes();
  }

  addRarityCode(rarityCode: RarityCode): Observable<RarityCode> {
    rarityCode.id = this.apiService.generateId();
    return this.dbService.addRarityCode(rarityCode);
  }

  addRarity(rarity: FrontRarity): Observable<Rarity[]> {
    let rarities: Rarity[] = [];

    let sendRarity: Rarity = {
      id: '',
      code: '',
      name: '',
      level: 0,
      color: '',
      colorTxt: '',
      bodyId: '',
      typeId: '',
    };

    rarity.bodies.forEach((body) => {
      body.types.forEach((type) => {
        sendRarity.id = this.apiService.generateId();
        sendRarity.code = rarity.code;
        sendRarity.name = rarity.name;
        sendRarity.level = rarity.level;
        sendRarity.color = rarity.color;
        sendRarity.colorTxt = rarity.colorTxt;
        sendRarity.bodyId = body.id;
        sendRarity.typeId = type.id;

        rarities.push(sendRarity);

        sendRarity = {
          id: '',
          code: '',
          name: '',
          level: 0,
          color: '',
          colorTxt: '',
          bodyId: '',
          typeId: '',
        };
      });
    });

    let observables: Observable<Rarity>[] = [];

    rarities.forEach((rarity) => {
      observables.push(this.dbService.addRarity(rarity));
    });

    return forkJoin(observables);
  }

  getAllRarities(): Observable<FrontRarity[]> {
    return forkJoin([
      this.dbService.getTypeCodes(),
      this.dbService.getBodyCodes(),
      this.dbService.getRarities(),
    ]).pipe(
      map((response) => {
        let frontRarities: FrontRarity[] = [];

        if (!response[0] || !response[1] || !response[2]) return frontRarities;

        let typeCodes = Object.values(response[0]);
        let bodyCodes = Object.values(response[1]);

        Object.values(response[2]).forEach((rarity) => {
          let body = bodyCodes.find((b) => b.id == rarity.bodyId);

          if (!body) return frontRarities;

          let type = typeCodes.find((t) => t.id == rarity.typeId);

          if (!type) return frontRarities;

          let frontBody: FrontBody = {
            id: body.id,
            code: body.code,
            name: body.name,
            types: [type],
          };

          let frontRarity: FrontRarity = {
            id: rarity.id,
            code: rarity.code,
            name: rarity.name,
            level: rarity.level,
            color: rarity.color,
            colorTxt: rarity.colorTxt,
            bodies: [frontBody],
          };

          frontRarities.push(frontRarity);
        });
        return frontRarities;
      })
    );
  }
}
