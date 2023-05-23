import { Injectable } from '@angular/core';
import { BarrelCode } from '../../Entities/BarrelCode';
import { forkJoin, Observable } from 'rxjs';
import { ApiFirebaseService } from '../../Services/api-firebase.service';
import { DbFirebaseService } from '../../Services/db-firebase.service';

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
  
}
