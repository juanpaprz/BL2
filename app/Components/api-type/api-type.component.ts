import { Component, Injectable, OnInit } from '@angular/core';
import { DbFirebaseService } from '../../Services/db-firebase.service';

@Component({
  selector: 'app-api-type',
  templateUrl: './api-type.component.html',
  styleUrls: ['./api-type.component.css'],
})
@Injectable()
export class ApiTypeComponent implements OnInit {
  constructor(private dbService: DbFirebaseService) {}

  ngOnInit() {}
}
