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
import { GripCode } from '../Entities/GripCode';
import { StockCode } from '../Entities/StockCode';
import { SightCode } from '../Entities/SightCode';
import { ElementCode } from '../Entities/ElementCode';
import { AccesoryCode } from '../Entities/AccesoryCode';
import { Balance } from '../Entities/Balance';

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

  getBarrels(): Observable<Barrel[]> {
    return this.httpClient.get<Barrel[]>(DBURL + 'Barrel.json');
  }

  addGripCode(gripCode: GripCode): Observable<GripCode> {
    return this.httpClient.put<GripCode>(
      `${DBURL}GripCode/${gripCode.id}.json`,
      gripCode
    );
  }

  getGripCodes(): Observable<GripCode[]> {
    return this.httpClient.get<GripCode[]>(DBURL + 'GripCode.json');
  }

  addStockCode(stockCode: StockCode): Observable<StockCode> {
    return this.httpClient.put<StockCode>(
      `${DBURL}StockCode/${stockCode.id}.json`,
      stockCode
    );
  }

  getStockCodes(): Observable<StockCode[]> {
    return this.httpClient.get<StockCode[]>(DBURL + 'StockCode.json');
  }

  addSightCode(sightCode: SightCode): Observable<SightCode> {
    return this.httpClient.put<SightCode>(
      `${DBURL}SightCode/${sightCode.id}.json`,
      sightCode
    );
  }

  getSightCodes(): Observable<SightCode[]> {
    return this.httpClient.get<SightCode[]>(DBURL + 'SightCode.json');
  }

  addElementCode(elementCode: ElementCode): Observable<ElementCode> {
    return this.httpClient.put<ElementCode>(
      `${DBURL}ElementCode/${elementCode.id}.json`,
      elementCode
    );
  }

  getElementCodes(): Observable<ElementCode[]> {
    return this.httpClient.get<ElementCode[]>(DBURL + 'ElementCode.json');
  }

  addAccesoryCode(accesoryCode: AccesoryCode): Observable<AccesoryCode> {
    return this.httpClient.put<AccesoryCode>(
      `${DBURL}AccesoryCode/${accesoryCode.id}.json`,
      accesoryCode
    );
  }

  getAccesoryCodes(): Observable<AccesoryCode[]> {
    return this.httpClient.get<AccesoryCode[]>(DBURL + 'AccesoryCode.json');
  }

  addBalance(balance: Balance): Observable<Balance> {
    return this.httpClient.put<Balance>(
      `${DBURL}Balance/${balance.id}.json`,
      balance
    );
  }
}
