import { Component, OnInit } from '@angular/core';
import { BarrelControllerService } from '../../Services/Controllers/barrel-controller.service';
import { BarrelCode } from '../../Entities/BarrelCode';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RarityControllerService } from '../../Services/Controllers/rarity-controller.service';
import { FrontRarity } from '../../Entities/FrontEntities/FrontRarity';
import { JqueryService } from '../../Services/jquery.service';
import {
  AtLeastOneCheckbox,
  ValidationService,
} from '../../Services/validation.service';

declare var $: any;

@Component({
  selector: 'app-api-barrel',
  templateUrl: './api-barrel.component.html',
  styleUrls: ['./api-barrel.component.css'],
})
export class ApiBarrelComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  barrelCodes: BarrelCode[] = [];
  rarityCodes: FrontRarity[] = [];

  codeHeaders: string[] = [];
  codeValues: string[][] = [];

  constructor(
    private barrelService: BarrelControllerService,
    private rarityService: RarityControllerService,
    private jqueryService: JqueryService,
    private validateService: ValidationService
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      barrel: new FormControl('', Validators.required),
      barrelId: new FormControl(''),
      rarities: new FormArray([], AtLeastOneCheckbox()),
    });

    $('#collapseBarrel').hide();

    this.getBarrelCodes();
    this.getFrontRarities();
  }

  get raritiesForm() {
    return this.form.get('rarities') as FormArray;
  }

  getBarrelCodes() {
    this.barrelService.getAllBarrelCodes().subscribe({
      next: (response) => {
        if (response)
          this.barrelCodes = Object.values(response).sort((a, b) =>
            a.name > b.name ? 1 : -1
          );

        if (!this.barrelCodes.length) return;

        this.codeHeaders = ['id', 'name', 'code'];

        this.barrelCodes.forEach((bc) => {
          this.codeValues.push(['id: ' + bc.id, bc.name, bc.code]);
        });
      },
    });
  }

  getFrontRarities() {
    this.rarityService.getAllRarityCodesExtended().subscribe({
      next: (response) => {
        if (response)
          this.rarityCodes = response.sort((a, b) => a.level - b.level);

        if (!this.rarityCodes.length) return;

        this.rarityCodes.forEach((rarityCode) => {
          let rarityGroup = new FormGroup({
            value: new FormControl(false),
            rarityId: new FormControl(rarityCode.id),
            bodies: new FormArray([]),
          });

          this.raritiesForm.push(rarityGroup);

          let bodyArray = rarityGroup.get('bodies') as FormArray;

          rarityCode.bodies.forEach((bodyCode) => {
            let bodyGroup = new FormGroup({
              value: new FormControl(false),
              bodyId: new FormControl(bodyCode.id),
              types: new FormArray([]),
            });

            bodyArray.push(bodyGroup);

            let typeArray = bodyGroup.get('types') as FormArray;

            bodyCode.types.forEach((typeCode) => {
              let typeGroup = new FormGroup({
                value: new FormControl(false),
                typeId: new FormControl(typeCode.id),
              });

              typeArray.push(typeGroup);
            });
          });
        });
        this.hideCollapse();
      },
    });
  }

  changeTableVisibility() {
    $('#collapseBarrel').slideToggle('slow');
  }

  selectBarrel(barrel: string[]) {
    let barrelId = barrel[0].slice(4);

    this.form.patchValue({
      barrel: barrel[1],
      barrelId: barrelId,
    });
  }

  hideCollapse() {
    this.rarityCodes.forEach((rarityCode) => {
      let selector: string = '';

      rarityCode.bodies.forEach((bodyCode) => {
        selector = '#collapse' + rarityCode.code + bodyCode.code;
        this.hideTypes(selector);
      });

      selector = '#collapse' + rarityCode.code;
      this.jqueryService.waitForElm(selector).then((elm) => {
        $(selector).hide();
      });
    });
  }

  hideTypes(selector: string) {
    this.jqueryService.waitForElm(selector).then((elm) => {
      $(selector).hide();
    });
  }

  onSelectRarity(id: number) {
    let selectedRarity = this.raritiesForm.controls[id] as FormGroup;
    let bodyFormArray = selectedRarity.controls['bodies'] as FormArray;
    let rarityCode = this.rarityCodes[id].code;

    if (!selectedRarity.value.value) {
      $('#collapse' + rarityCode).show('slow');
      bodyFormArray.addValidators(AtLeastOneCheckbox());
    } else {
      $('#collapse' + rarityCode).hide('slow');
    }
  }

  isFieldValid(field: string): boolean {
    return this.validateService.isFieldValid(this.form, field);
  }

  setInvalidClass(field: string) {
    return this.validateService.setInvalidClass(this.form, field);
  }
}
