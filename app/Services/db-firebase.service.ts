import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const DBURL = 'https://bl2-weapons-default-rtdb.firebaseio.com/';

@Injectable()
export class DbFirebaseService {
  constructor(private httpClient: HttpClient) {}

  getTypeCodes() {
    this.httpClient.get(DBURL + 'Type.json');
  }
}
