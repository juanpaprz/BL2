import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.css'],
})
export class TablePaginationComponent implements OnInit, OnChanges {
  @Input() totalData: number = 0;

  @Input() displayValue: number = 0;

  constructor() {}

  pages: number[] = [];
  pagesDisplay: number[] = [];

  currentPage: number = 0;

  ngOnInit() {}

  ngOnChanges() {
    if (this.totalData > 0) {
      if (this.displayValue > this.totalData)
        this.displayValue = this.totalData;

      this.getPagesDisplay();
    }
  }

  getPages() {
    let total = Math.ceil(this.totalData / this.displayValue);

    this.pages = [];

    for (let i = 0; i < total; i++) {
      this.pages.push(i + 1);
    }
  }

  getPagesDisplay() {
    this.getPages();

    console.log(this.pages);

    if (this.pages.length <= 3) {
      this.pagesDisplay = this.pages;
      return;
    }

    if (this.currentPage + 3 > this.pages.length) {
      console.log(this.currentPage);
      return;
    }

    this.pagesDisplay = this.pages.slice(this.currentPage, 3);
    console.log(this.pagesDisplay);
  }

  changePage(page: number) {
    this.currentPage = page - 1;
    this.getPagesDisplay();
  }
}
