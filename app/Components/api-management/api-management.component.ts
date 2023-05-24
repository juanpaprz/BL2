import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiFirebaseService } from '../../Services/api-firebase.service';

@Component({
  selector: 'app-api-management',
  templateUrl: './api-management.component.html',
  styleUrls: ['./api-management.component.css'],
})
export class ApiManagementComponent implements OnInit {
  constructor(private router: Router, private apiService: ApiFirebaseService) {}

  ngOnInit() {}

  navigate(route: string) {
    this.router.navigate([`/api/${route}`]);
  }

  addDataTemp(entity: string) {
    entity += 'a';
    switch (entity) {
      case 'grip':
        this.apiService.addGripCodes().subscribe();
        break;
      case 'stock':
        this.apiService.addStockCodes().subscribe();
        break;
      case 'sight':
        this.apiService.addSightCodes().subscribe();
        break;
      case 'element':
        this.apiService.addElementCodes().subscribe();
        break;
      case 'accesory':
        this.apiService.addAccesoryCodes().subscribe();
        break;
    }
  }
}
