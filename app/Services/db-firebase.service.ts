import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeCode } from '../Entities/TypeCode';
import { Observable } from 'rxjs';
import { Type } from '../Entities/Type';
import { BodyCode } from '../Entities/BodyCode';
import { Body } from '../Entities/Body';
import { RarityCode } from '../Entities/RarityCode';
import { Rarity } from '../Entities/Rarity';
import { BarrelCode } from '../Entities/BarrelCode';
import { Barrel } from '../Entities/Barrel';

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

  getBodies(): Observable<Body[]> {
    return this.httpClient.get<Body[]>(DBURL + 'Body.json');
  }

  addBody(body: Body): Observable<Body> {
    return this.httpClient.put<Body>(`${DBURL}Body/${body.id}.json`, body);
  }

  getRarityCodes(): Observable<RarityCode[]> {
    return this.httpClient.get<RarityCode[]>(DBURL + 'RarityCode.json');
  }

  addRarityCode(rarityCode: RarityCode): Observable<RarityCode> {
    return this.httpClient.put<RarityCode>(
      `${DBURL}RarityCode/${rarityCode.id}.json`,
      rarityCode
    );
  }

  addRarity(rarity: Rarity): Observable<Rarity> {
    return this.httpClient.put<Rarity>(
      `${DBURL}Rarity/${rarity.id}.json`,
      rarity
    );
  }

  getRarities(): Observable<Rarity[]> {
    return this.httpClient.get<Rarity[]>(DBURL + 'Rarity.json');
  }

  addBarrelCode(barrelCode: BarrelCode): Observable<BarrelCode> {
    return this.httpClient.put<BarrelCode>(
      `${DBURL}BarrelCode/${barrelCode.id}.json`,
      barrelCode
    );
  }

  getBarrelCodes(): Observable<BarrelCode[]> {
    return this.httpClient.get<BarrelCode[]>(DBURL + 'BarrelCode.json');
  }

  addBarrel(barrel: Barrel): Observable<Barrel> {
    return this.httpClient.put<Barrel>(
      `${DBURL}Barrel/${barrel.id}.json`,
      barrel
    );
  }
}
