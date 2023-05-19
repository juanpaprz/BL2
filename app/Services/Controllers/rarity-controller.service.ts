import { Injectable } from '@angular/core';
import { RarityCode } from '../../Entities/RarityCode';
import { ApiFirebaseService } from '../../Services/api-firebase.service';
import { DbFirebaseService } from '../../Services/db-firebase.service';
import { Observable } from 'rxjs';

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
}
