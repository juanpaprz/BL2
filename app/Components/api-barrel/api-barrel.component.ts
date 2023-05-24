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
import { FrontBarrel } from '../../Entities/FrontEntities/FrontBarrel';
import { Type } from '../../Entities/Type';
import { FrontBody } from '../../Entities/FrontEntities/FrontBody';

declare var $: any;

@Component({
  selector: 'app-api-barrel',
  templateUrl: './api-barrel.component.html',
  styleUrls: ['./api-barrel.component.css'],
})
export class ApiBarrelComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  barrel: FrontBarrel = {
    id: '',
    code: '',
    name: '',
    rarities: [],
  };

  barrelCodes: BarrelCode[] = [];
  rarityCodes: FrontRarity[] = [];
  barrels: FrontBarrel[] = [];

  codeHeaders: string[] = [];
  codeValues: string[][] = [];

  barrelHeaders: string[] = [];
  barrelValues: string[][] = [];

  disableButton: Boolean = false;

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
    this.getBarrels();
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
    this.disableButton = true;
    this.rarityCodes = [];
    this.rarityService.getAllRarityCodesExtended().subscribe({
      next: (response) => {
        if (response)
          this.rarityCodes = response.sort((a, b) => a.level - b.level);

        if (!this.rarityCodes.length) return;

        this.rarityCodes.forEach((rarityCode) => {
          rarityCode.bodies.sort((a, b) => (a.name > b.name ? 1 : -1));

          let rarityGroup = new FormGroup({
            value: new FormControl(false),
            rarityId: new FormControl(rarityCode.id),
            bodies: new FormArray([]),
          });

          this.raritiesForm.push(rarityGroup);

          let bodyArray = rarityGroup.get('bodies') as FormArray;

          rarityCode.bodies.forEach((bodyCode) => {
            bodyCode.types.sort((a, b) => (a.name > b.name ? 1 : -1));

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
        this.disableButton = false;
        this.hideCollapse();
      },
    });
  }

  getBarrels() {
    this.barrelService.getAllBarrels().subscribe({
      next: (response) => {
        if (response)
          this.barrels = Object.values(response).sort(
            (a, b) =>
              a.name.localeCompare(b.name) ||
              a.rarities[0].level - b.rarities[0].level ||
              a.rarities[0].bodies[0].types[0].name.localeCompare(
                b.rarities[0].bodies[0].types[0].name
              ) ||
              a.rarities[0].bodies[0].name.localeCompare(
                b.rarities[0].bodies[0].name
              )
          );

        if (!this.barrels.length) return;

        this.barrelHeaders = ['code', 'name', 'type', 'body', 'rarity'];

        this.barrelValues = [];

        this.barrels.forEach((b) => {
          this.barrelValues.push([
            b.code,
            b.name,
            b.rarities[0].bodies[0].types[0].name,
            b.rarities[0].bodies[0].name,
            b.rarities[0].name,
          ]);
        });
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

    this.changeTableVisibility();
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
      bodyFormArray.updateValueAndValidity();
    } else {
      $('#collapse' + rarityCode).hide('slow');
      bodyFormArray.clearValidators();
      bodyFormArray.updateValueAndValidity();

      Object.values(bodyFormArray.controls).forEach((bodyGroup) => {
        let bodyFomGroup = bodyGroup as FormGroup;

        bodyFomGroup.patchValue({
          value: false,
        });
      });
    }
  }

  onSelectBody(rarityId: number, id: number) {
    let selectedRarity = this.raritiesForm.controls[rarityId] as FormGroup;
    let bodyFormArray = selectedRarity.controls['bodies'] as FormArray;

    let selectedBody = bodyFormArray.controls[id] as FormGroup;
    let typeFormArray = selectedBody.controls['types'] as FormArray;

    let rarityCode = this.rarityCodes[rarityId].code;
    let bodyCode = this.rarityCodes[rarityId].bodies[id].code;
    let selector = '#collapse' + rarityCode + bodyCode;

    if (!selectedBody.value.value) {
      $(selector).show('slow');
      typeFormArray.addValidators(AtLeastOneCheckbox());
      typeFormArray.updateValueAndValidity();
    } else {
      $(selector).hide('slow');
      typeFormArray.clearValidators();
      typeFormArray.updateValueAndValidity();

      Object.values(typeFormArray.controls).forEach((typeGroup) => {
        let typeFormGroup = typeGroup as FormGroup;

        typeFormGroup.patchValue({
          value: false,
        });
      });
    }
  }

  isFieldValid(
    field: string,
    formRarity: number = 0,
    formBody: number = 0
  ): boolean {
    if (field == 'bodies') {
      let rarityFormGroup = this.raritiesForm.controls[formRarity] as FormGroup;
      return rarityFormGroup
        ? this.validateService.isFieldValid(rarityFormGroup, field)
        : true;
    }

    if (field == 'types') {
      let rarityFormGroup = this.raritiesForm.controls[formRarity] as FormGroup;

      if (!rarityFormGroup) return true;

      let bodyFormArray = rarityFormGroup.controls['bodies'] as FormArray;
      let bodyFormGroup = bodyFormArray.controls[formBody] as FormGroup;

      return bodyFormGroup
        ? this.validateService.isFieldValid(bodyFormGroup, field)
        : true;
    }

    return this.validateService.isFieldValid(this.form, field);
  }

  setInvalidClass(field: string, formRarity: number = 0, formBody: number = 0) {
    if (field == 'bodies') {
      let rarityFormGroup = this.raritiesForm.controls[formRarity] as FormGroup;
      return rarityFormGroup
        ? this.validateService.setInvalidClass(rarityFormGroup, field)
        : '';
    }

    if (field == 'types') {
      let rarityFormGroup = this.raritiesForm.controls[formRarity] as FormGroup;

      if (!rarityFormGroup) return '';

      let bodyFormArray = rarityFormGroup.controls['bodies'] as FormArray;
      let bodyFormGroup = bodyFormArray.controls[formBody] as FormGroup;

      return bodyFormGroup
        ? this.validateService.setInvalidClass(bodyFormGroup, field)
        : '';
    }

    return this.validateService.setInvalidClass(this.form, field);
  }

  setTypeButtonsClass(
    field: string,
    formRarity: number,
    formBody: number,
    formType: number
  ) {
    let rarityFormGroup = this.raritiesForm.controls[formRarity] as FormGroup;

    if (!rarityFormGroup) return 'btn-outline-secondary';

    let bodyFormArray = rarityFormGroup.controls['bodies'] as FormArray;
    let bodyFormGroup = bodyFormArray.controls[formBody] as FormGroup;

    if (!bodyFormGroup) return 'btn-outline-secondary';

    let typeFormArray = bodyFormGroup.controls['types'] as FormArray;
    let typeFormGroup = typeFormArray.controls[formType] as FormGroup;

    if (!typeFormGroup) return 'btn-outline-secondary';

    let isSelected = typeFormGroup.value.value;

    if (!isSelected) return 'btn-outline-secondary';

    return isSelected
      ? 'btn-outline-primary'
      : this.isFieldValid(field, formRarity, formBody)
      ? 'btn-outline-danger'
      : 'btn-outline-secondary';
  }

  toucheAllFields(touche: boolean) {
    this.validateService.toucheFields(this.form, touche);

    Object.values(this.raritiesForm.controls).forEach((bodyForm) => {
      let bodyFormGroup = bodyForm as FormGroup;
      this.validateService.toucheFields(bodyFormGroup, touche);

      let bodyFormArray = bodyFormGroup.controls['bodies'] as FormArray;
      Object.values(bodyFormArray.controls).forEach((typeForm) => {
        let typeFormGroup = typeForm as FormGroup;
        this.validateService.toucheFields(typeFormGroup, touche);
      });
    });
  }

  addBarrel() {
    if (this.form.valid) {
      this.disableButton = true;

      let selectedBarrel = this.barrelCodes.find(
        (b) => b.id == this.form.value.barrelId
      );

      if (!selectedBarrel) return;

      this.barrel.code = selectedBarrel.code;
      this.barrel.name = selectedBarrel.name;

      let selectedRarities = this.raritiesForm.controls.filter(
        (r) => r.value.value
      ) as FormGroup[];

      let rarities: FrontRarity[] = [];
      selectedRarities.forEach((rarityFormGroup) => {
        let rarity = this.rarityCodes.find(
          (r) => r.id == rarityFormGroup.value.rarityId
        );

        if (!rarity) return;

        let bodyFormArray = rarityFormGroup.controls['bodies'] as FormArray;

        let selectedBodies = bodyFormArray.controls.filter(
          (b) => b.value.value
        ) as FormGroup[];

        let bodies: FrontBody[] = [];
        selectedBodies.forEach((bodyFormGroup) => {
          let body = rarity?.bodies.find(
            (b) => b.id == bodyFormGroup.value.bodyId
          );

          if (!body) return;

          let typeFormArray = bodyFormGroup.controls['types'] as FormArray;

          let selectedTypes = typeFormArray.controls.filter(
            (t) => t.value.value
          ) as FormGroup[];

          let types: Type[] = [];
          selectedTypes.forEach((typeFormGroup) => {
            let type = body?.types.find(
              (t) => t.id == typeFormGroup.value.typeId
            );

            if (!type) return;

            types.push(type);
          });

          body.types = types;
          bodies.push(body);
        });

        rarity.bodies = bodies;
        rarities.push(rarity);
      });

      this.barrel.rarities = rarities;

      this.barrelService.addBarrel(this.barrel).subscribe({
        next: (response) => {
          console.log(response);
          this.form.patchValue({
            barrel: '',
            barrelId: '',
          });
          this.raritiesForm.clear();
          this.toucheAllFields(false);
          this.getFrontRarities();
          this.getBarrels();
          this.disableButton = false;
        },
      });
    } else {
      this.toucheAllFields(true);
    }
  }
}
