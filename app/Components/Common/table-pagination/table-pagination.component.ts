import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.css'],
})
export class TablePaginationComponent implements OnInit, OnChanges {
  @Input() totalData: number = 0;

  @Input() displayValue: number = 0;

  @Output() currentPageEmitter = new EventEmitter<number>();

  constructor() {}

  pages: number[] = [];
  pagesDisplay: number[] = [];

  currentPage: number = 0;
  startValue: number = 0;

  ngOnInit() {}

  ngOnChanges() {
    if (this.totalData > 0) {
      this.startValue = this.displayValue;

      if (this.startValue > this.totalData) this.startValue = this.totalData;

      this.currentPage = 0;

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

    this.startValue = this.displayValue * (this.currentPage + 1);

    if (this.startValue > this.totalData) this.startValue = this.totalData;

    this.currentPageEmitter.emit(this.currentPage);

    if (this.pages.length <= 3) {
      this.pagesDisplay = this.pages;
      return;
    }

    if (this.currentPage == 0) {
      this.pagesDisplay = [
        this.pages[this.currentPage],
        this.pages[this.currentPage + 1],
        this.pages[this.currentPage + 2],
      ];
      return;
    }

    if (this.currentPage == this.pages.length - 1) {
      this.pagesDisplay = [
        this.pages[this.currentPage - 2],
        this.pages[this.currentPage - 1],
        this.pages[this.currentPage],
      ];
      return;
    }

    this.pagesDisplay = [
      this.pages[this.currentPage - 1],
      this.pages[this.currentPage],
      this.pages[this.currentPage + 1],
    ];
  }

  changePage(page: number) {
    this.currentPage = page - 1;
    this.getPagesDisplay();
  }

  nextPage() {
    this.currentPage++;
    this.getPagesDisplay();
  }

  previousPage() {
    this.currentPage--;
    this.getPagesDisplay();
  }

  setActiveClass(page: number) {
    return {
      active: this.currentPage == page - 1,
    };
  }

  setDisablePreviousClass() {
    return {
      disabled: this.currentPage == 0,
    };
  }

  setDisableNextClass() {
    return {
      disabled: this.currentPage == this.pages.length - 1,
    };
  }
}
