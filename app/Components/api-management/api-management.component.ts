import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-api-management',
  templateUrl: './api-management.component.html',
  styleUrls: ['./api-management.component.css'],
})
export class ApiManagementComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  navigate(route: string) {
    this.router.navigate([`/api/${route}`]);
  }
}
