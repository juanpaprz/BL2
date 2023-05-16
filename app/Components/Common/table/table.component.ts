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

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.headers.forEach((header, index) => {
      this.headers[index] = header[0].toUpperCase() + header.slice(1);
    });
  }

  isId(value: string): boolean {
    return value.includes('id:');
  }
}
