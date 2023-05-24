import {
  Component,
  Input,
  OnInit,
  OnChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { StyleService } from '../../../Services/style.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, OnChanges {
  @Input() headers: string[] = [];

  @Input() values: string[][] = [];

  @Input() hideId: boolean = true;

  @Input() selectable: boolean = false;

  @Output() selectItemEmitter = new EventEmitter<string[]>();

  displayData: string[][] = [];
  displayValue: number = 10;
  filterValue: string = '';
  filteredData: string[][] = [];

  selectedItemId: string = '';

  constructor(private styleService: StyleService) {}

  ngOnInit() {}

  ngOnChanges() {
    this.headers.forEach((header, index) => {
      this.headers[index] = header[0].toUpperCase() + header.slice(1);
    });

    this.filteredData = this.values;
    this.displayData = this.filteredData.slice(0, this.displayValue);
  }

  setSelectClasses(itemId: string) {
    return {
      selectable: this.selectable,
      selected: this.selectedItemId == itemId,
    };
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

  selectItem(data: string[]) {
    if (!this.selectable) return;

    this.selectedItemId = data[0];
    this.selectItemEmitter.emit(data);
  }
}
