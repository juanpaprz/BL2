import { Component, OnInit } from '@angular/core';
import { BodyCode } from '../../Entities/BodyCode';
import { BodyControllerService } from '../../Services/Controllers/body-controller.service';
import { TypeCode } from '../../Entities/TypeCode';
import { TypeControllerService } from '../../Services/Controllers/type-controller.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { BarrelControllerService } from '../../Services/Controllers/barrel-controller.service';
import { FrontBarrel } from '../../Entities/FrontEntities/FrontBarrel';
import { GripCode } from '../../Entities/GripCode';
import { StockCode } from '../../Entities/StockCode';
import { SightCode } from '../../Entities/SightCode';
import { ElementCode } from '../../Entities/ElementCode';
import { AccesoryCode } from '../../Entities/AccesoryCode';
import { ApiFirebaseService } from '../../Services/api-firebase.service';
import { forkJoin } from 'rxjs';
import {
  AtLeastOneCheckbox,
  ValidationService,
} from '../../Services/validation.service';
import { Balance } from '../../Entities/Balance';

@Component({
  selector: 'app-api-balance',
  templateUrl: './api-balance.component.html',
  styleUrls: ['./api-balance.component.css'],
})
export class ApiBalanceComponent implements OnInit {
  constructor(
    private typeService: TypeControllerService,
    private bodyService: BodyControllerService,
    private barrelService: BarrelControllerService,
    private apiService: ApiFirebaseService,
    private validateService: ValidationService
  ) {}

  form: FormGroup = new FormGroup({});

  typeCodes: TypeCode[] = [];
  bodyCodes: BodyCode[] = [];
  barrels: FrontBarrel[] = [];
  gripCodes: GripCode[] = [];
  stockCodes: StockCode[] = [];
  sightCodes: SightCode[] = [];
  elementCodes: ElementCode[] = [];
  accesoryCodes: AccesoryCode[] = [];

  balance: Balance = {
    id: '',
    name: '',
    typeId: '',
    bodyId: '',
    grips: [],
    stocks: [],
    sights: [],
    elements: [],
    accesories: [],
  };

  get grips() {
    return this.form.get('grips') as FormArray;
  }

  get stocks() {
    return this.form.get('stocks') as FormArray;
  }

  get sights() {
    return this.form.get('sights') as FormArray;
  }

  get elements() {
    return this.form.get('elements') as FormArray;
  }

  get accesories() {
    return this.form.get('accesories') as FormArray;
  }

  ngOnInit() {
    this.form = new FormGroup({
      type: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
      barrel: new FormControl('', Validators.required),
      grips: new FormArray([], AtLeastOneCheckbox()),
      stocks: new FormArray([], AtLeastOneCheckbox()),
      sights: new FormArray([], AtLeastOneCheckbox()),
      elements: new FormArray([], AtLeastOneCheckbox()),
      accesories: new FormArray([], AtLeastOneCheckbox()),
    });

    this.getTypeCodes();
    this.getComponentsCodes();
  }

  getTypeCodes() {
    this.typeService.getAllTypeCodes().subscribe({
      next: (response) => {
        if (response)
          this.typeCodes = Object.values(response).sort((a, b) =>
            a.name > b.name ? 1 : -1
          );
      },
    });
  }

  getBodyCodes() {
    let typeCodeId = this.form.value.type as string;

    this.bodyService.getBodyCodesOf(typeCodeId).subscribe({
      next: (response) => {
        if (response)
          this.bodyCodes = Object.values(response).sort((a, b) =>
            a.name > b.name ? 1 : -1
          );
      },
    });
  }

  getBarrels() {
    let typeCodeId = this.form.value.type as string;
    let bodyCodeId = this.form.value.body as string;

    this.barrelService.getBarrelsOf(typeCodeId, bodyCodeId).subscribe({
      next: (response) => {
        if (response)
          this.barrels = Object.values(response).sort(
            (a, b) => a.rarities[0].level - b.rarities[0].level
          );
      },
    });
  }

  getComponentsCodes() {
    forkJoin([
      this.apiService.getGripCodes(),
      this.apiService.getStockCodes(),
      this.apiService.getSightCodes(),
      this.apiService.getElementCodes(),
      this.apiService.getAccesoryCodes(),
    ]).subscribe({
      next: (response) => {
        if (
          !response[0] ||
          !response[1] ||
          !response[2] ||
          !response[3] ||
          !response[4]
        )
          return;

        this.gripCodes = Object.values(response[0]).sort((a, b) =>
          a.name > b.name ? 1 : -1
        );
        this.stockCodes = Object.values(response[1]).sort((a, b) =>
          a.name > b.name ? 1 : -1
        );
        this.sightCodes = Object.values(response[2]).sort((a, b) =>
          a.name > b.name ? 1 : -1
        );
        this.elementCodes = Object.values(response[3]).sort((a, b) =>
          a.name > b.name ? 1 : -1
        );
        this.accesoryCodes = Object.values(response[4]).sort((a, b) =>
          a.name > b.name ? 1 : -1
        );

        let first = 'None';

        this.stockCodes.sort((a, b) =>
          a.name == first ? -1 : b.name == first ? 1 : 0
        );
        this.sightCodes.sort((a, b) =>
          a.name == first ? -1 : b.name == first ? 1 : 0
        );
        this.elementCodes.sort((a, b) =>
          a.name == first ? -1 : b.name == first ? 1 : 0
        );
        this.accesoryCodes.sort((a, b) =>
          a.name == first ? -1 : b.name == first ? 1 : 0
        );

        this.gripCodes.forEach((g) => {
          let gripGroup = new FormGroup({
            value: new FormControl(false),
            gripId: new FormControl(g.id),
          });
          this.grips.push(gripGroup);
        });

        this.stockCodes.forEach((s) => {
          let stockGroup = new FormGroup({
            value: new FormControl(false),
            stockId: new FormControl(s.id),
          });
          this.stocks.push(stockGroup);
        });

        this.sightCodes.forEach((s) => {
          let sightGroup = new FormGroup({
            value: new FormControl(false),
            sightId: new FormControl(s.id),
          });
          this.sights.push(sightGroup);
        });

        this.elementCodes.forEach((e) => {
          let elementGroup = new FormGroup({
            value: new FormControl(false),
            elementId: new FormControl(e.id),
          });
          this.elements.push(elementGroup);
        });

        this.accesoryCodes.forEach((a) => {
          let accesoryGroup = new FormGroup({
            value: new FormControl(false),
            accesoryId: new FormControl(a.id),
          });
          this.accesories.push(accesoryGroup);
        });
      },
    });
  }

  isFieldValid(field: string): boolean {
    return this.validateService.isFieldValid(this.form, field);
  }

  setInvalidClass(field: string) {
    return this.validateService.setInvalidClass(this.form, field);
  }

  addBalance() {
    if (this.form.valid) {
      let selectedGrips = this.grips.controls
        .filter((g) => g.value.value)
        .map((g) => g.value.gripId);

      let selectedStocks = this.stocks.controls
        .filter((s) => s.value.value)
        .map((s) => s.value.stockId);

      let selectedSights = this.sights.controls
        .filter((s) => s.value.value)
        .map((s) => s.value.sightId);

      let selectedElements = this.elements.controls
        .filter((e) => e.value.value)
        .map((e) => e.value.elementId);

      let selectedAccesories = this.accesories.controls
        .filter((a) => a.value.value)
        .map((e) => e.value.elementId);

        
    } else {
      this.validateService.toucheFields(this.form, true);
    }
  }
}
