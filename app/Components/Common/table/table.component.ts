import { Component, Input, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, OnChanges {
  @Input() headers: string[] = [];

  @Input() values: string[][] = [];

  @Input() hideId: boolean = true;

  displayData: string[][] = [];
  displayValue: number = 10;
  filterValue: string = '';
  filteredData: string[][] = [];

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    this.headers.forEach((header, index) => {
      this.headers[index] = header[0].toUpperCase() + header.slice(1);
    });

    this.filteredData = this.values;
    this.displayData = this.filteredData.slice(0, this.displayValue);
  }

  isId(value: string): boolean {
    return value.includes('id:');
  }

  changeDisplay(value: number) {
    this.displayValue = value;
    this.displayData = this.filteredData.slice(0, this.displayValue);
  }

  filterData(value: string) {
    this.filteredData = this.values.filter((v) =>
      v.some((f) => {
        let lower = f.toLowerCase();
        return lower.includes(value);
      })
    );
    this.displayData = this.filteredData.slice(0, this.displayValue);
  }

  changePage(value: number) {
    this.displayData = this.filteredData.slice(
      this.displayValue * value,
      this.displayValue * (value + 1)
    );
  }
}
