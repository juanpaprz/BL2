import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { distinctUntilChanged, fromEvent, map, debounceTime } from 'rxjs';

@Component({
  selector: 'app-table-filter',
  templateUrl: './table-filter.component.html',
  styleUrls: ['./table-filter.component.css'],
})
export class TableFilterComponent implements OnInit, AfterViewInit {
  @Output() filterDataEmitter = new EventEmitter<string>();

  @ViewChild('filter') filter: ElementRef<HTMLInputElement> = {} as ElementRef;

  constructor() {}

  ngOnInit() {}

  ngAfterViewInit() {
    fromEvent(this.filter.nativeElement, 'input')
      .pipe(map((event: Event) => (event.target as HTMLInputElement).value))
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .subscribe((data) => this.filterData(data));
  }

  filterData(value: string) {
    this.filterDataEmitter.emit(value);
  }
}
