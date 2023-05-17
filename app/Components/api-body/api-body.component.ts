import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BodyCode } from '../../Entities/BodyCode';
import { ApiFirebaseService } from '../../Services/api-firebase.service';

@Component({
  selector: 'app-api-body',
  templateUrl: './api-body.component.html',
  styleUrls: ['./api-body.component.css'],
})
export class ApiBodyComponent implements OnInit {
  form: FormGroup = new FormGroup([]);

  bodyCodes: BodyCode[] = [];

  constructor(private dbService: ApiFirebaseService) {}

  ngOnInit() {}

  getBodyCodes() {
    this.dbService.getAllBodyCodes().subscribe({
      next: (response) => {
        if (response) this.bodyCodes = Object.values(response);
      },
    });
  }
}
