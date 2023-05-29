import { Injectable } from '@angular/core';
import { Balance } from '../../Entities/Balance';
import { Observable } from 'rxjs';
import { DbFirebaseService } from '../../Services/db-firebase.service';

@Injectable()
export class BalanceControllerService {
  constructor(private dbService: DbFirebaseService) {}

  addBalance(balance: Balance): Observable<Balance> {
    return this.dbService.addBalance(balance);
  }
}
