import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-invalid-field',
  templateUrl: './invalid-field.component.html',
  styleUrls: ['./invalid-field.component.css'],
})
export class InvalidFieldComponent implements OnInit {
  @Input() message: string = '';

  @Input() display: boolean = false;

  constructor() {}

  ngOnInit() {}
}
