import { Component, Injectable, OnInit } from '@angular/core';
import { FirebaseService } from 'app/Services/firebase.service';

@Injectable()
@Component({
  selector: 'app-api-type',
  templateUrl: './api-type.component.html',
  styleUrls: ['./api-type.component.css'],
})
export class ApiTypeComponent implements OnInit {
  constructor(private dbService: FirebaseService) {}

  ngOnInit() {}
}
