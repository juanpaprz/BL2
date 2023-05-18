import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table-display-select',
  templateUrl: './table-display-select.component.html',
  styleUrls: ['./table-display-select.component.css'],
})
export class TableDisplaySelectComponent implements OnInit {
  constructor() {}

  @Output() changeDisplayEmitter = new EventEmitter<number>();

  ngOnInit() {}

  changeDisplay(value: string) {
    this.changeDisplayEmitter.emit(+value);
  }
}
