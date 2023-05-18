import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, OnChanges {
  @Input() headers: string[] = [];

  @Input() values: any[] = [];

  @Input() hideId: boolean = true;

  displayData: any[] = [];
  displayValue: number = 10;

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.headers.forEach((header, index) => {
      this.headers[index] = header[0].toUpperCase() + header.slice(1);
    });

    this.displayData = this.values.slice(0, this.displayValue);
  }

  isId(value: string): boolean {
    return value.includes('id:');
  }

  changeDisplay(value: number) {
    this.displayValue = value;
    this.displayData = this.values.slice(0, this.displayValue);
  }
}
