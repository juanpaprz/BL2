import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AtLeastOneCheckbox,
  ValidationService,
} from '../../Services/validation.service';
import { RarityCode } from '../../Entities/RarityCode';
import { RarityControllerService } from '../../Services/Controllers/rarity-controller.service';
import { BodyControllerService } from '../../Services/Controllers/body-controller.service';
import { FrontBody } from '../../Entities/FrontEntities/FrontBody';
import { FrontRarity } from '../../Entities/FrontEntities/FrontRarity';
import { Type } from '../../Entities/Type';
import { JqueryService } from '../../Services/jquery.service';

declare var $: any;

@Component({
  selector: 'app-api-rarity',
  templateUrl: './api-rarity.component.html',
  styleUrls: ['./api-rarity.component.css'],
})
export class ApiRarityComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  rarityCodes: RarityCode[] = [];

  frontBodies: FrontBody[] = [];
  rarities: FrontRarity[] = [];

  headers: string[] = [];
  values: string[][] = [];

  rarity: FrontRarity = {
    id: '',
    code: '',
    level: 0,
    name: '',
    color: '',
    colorTxt: '',
    bodies: [],
  };

  allSelected: Boolean = false;
  disableButton: Boolean = false;

  constructor(
    private rarityService: RarityControllerService,
    private validateService: ValidationService,
    private bodyService: BodyControllerService,
    private jqueryService: JqueryService
  ) {}

  get bodies() {
    return this.form.get('bodies') as FormArray;
  }

  ngOnInit() {
    this.form = new FormGroup({
      rarityId: new FormControl('', Validators.required),
      all: new FormControl(false),
      bodies: new FormArray([], AtLeastOneCheckbox()),
    });

    this.getRarityCodes();
    this.getFrontBodies();
    this.getFrontRarities();

    this.hideTypes();
  }

  onSelectBody(id: number) {
    let selectedBody = this.bodies.controls[id] as FormGroup;
    let typeFormArray = selectedBody.controls['types'] as FormArray;

    if (!selectedBody.value.value)
      typeFormArray.addValidators(AtLeastOneCheckbox());
    else {
      typeFormArray.clearValidators();
      typeFormArray.updateValueAndValidity();
    }
    Object.values(typeFormArray.controls).forEach((t) => {
      let typeFormGroup = t as FormGroup;
      if (!selectedBody.value.value) typeFormGroup.controls['value'].enable();
      else {
        typeFormGroup.patchValue({
          value: false,
        });
        typeFormGroup.controls['value'].disable();
      }
    });
  }

  selectAll() {
    Object.values(this.bodies.controls).forEach((b, index) => {
      this.onSelectBody(index);

      let bodyForm = b as FormGroup;
      bodyForm.patchValue({
        value: !this.form.value.all,
      });

      let typeFormArray = bodyForm.controls['types'] as FormArray;

      Object.values(typeFormArray.controls).forEach((t) => {
        let typeFormGroup = t as FormGroup;
        typeFormGroup.patchValue({
          value: !this.form.value.all,
        });
      });
    });
  }

  getRarityCodes() {
    this.rarityService.getAllRarityCodes().subscribe({
      next: (response) => {
        if (response)
          this.rarityCodes = Object.values(response).sort(
            (a, b) => a.level - b.level
          );
      },
    });
  }

  getFrontBodies() {
    this.bodyService.getAllFrontBodies().subscribe({
      next: (response) => {
        if (response)
          this.frontBodies = Object.values(response).sort((a, b) =>
            a.name > b.name ? 1 : -1
          );

        if (this.frontBodies.length) {
          this.frontBodies.forEach((frontB) => {
            let formBody = new FormGroup({
              value: new FormControl(false),
              bodyId: new FormControl(frontB.id),
              types: new FormArray([]),
            });
            this.bodies.push(formBody);

            let typesArray = formBody.get('types') as FormArray;

            frontB.types.forEach((type) => {
              let formType = new FormGroup({
                value: new FormControl(false),
                typeId: new FormControl(type.id),
              });

              formType.controls['value'].disable();

              typesArray.push(formType);
            });
          });
        }
      },
    });
  }

  getFrontRarities() {
    this.rarityService.getAllRarities().subscribe({
      next: (response) => {
        if (response)
          this.rarities = Object.values(response).sort(
            (a, b) =>
              a.level - b.level ||
              a.bodies[0].types[0].name.localeCompare(
                b.bodies[0].types[0].name
              ) ||
              a.bodies[0].name.localeCompare(b.bodies[0].name)
          );

        if (!this.rarities.length) return;

        this.values = [];

        this.headers = ['code', 'name', 'color', 'type', 'body'];

        this.rarities.forEach((r) => {
          this.values.push([
            r.code,
            r.name,
            r.colorTxt,
            r.bodies[0].types[0].name,
            r.bodies[0].name,
          ]);
        });
      },
    });
  }

  hideTypes() {
    this.frontBodies.forEach((fb) => {
      let selector = '#collapse' + fb.code;
      this.jqueryService.waitForElm(selector).then((elm) => {
        $(selector).hide();
      });
    });
  }

  isFieldValid(field: string): boolean {
    return this.validateService.isFieldValid(this.form, field);
  }

  setInvalidClass(field: string) {
    return this.validateService.setInvalidClass(this.form, field);
  }

  addRarity() {
    if (this.form.valid) {
      this.disableButton = true;

      let selectedRarity = this.rarityCodes.find(
        (r) => r.id == this.form.value.rarityId
      );

      if (!selectedRarity) return;

      this.rarity.code = selectedRarity.code;
      this.rarity.name = selectedRarity.name;
      this.rarity.level = selectedRarity.level;
      this.rarity.color = selectedRarity.color;
      this.rarity.colorTxt = selectedRarity.colorTxt;

      let selectedBodies = this.bodies.controls.filter((b) => b.value.value);

      let selectedBodyArray: FrontBody[] = [];

      selectedBodies.forEach((b) => {
        let bodyFormGroup = b as FormGroup;
        let typeArray = bodyFormGroup.controls['types'] as FormArray;

        let selectedTypes = typeArray.controls.filter((t) => t.value.value);

        let selectedTypeArray: Type[] = [];

        let body = this.frontBodies.find((fb) => fb.id == b.value.bodyId);

        if (!body) return;

        selectedTypes.forEach((t) => {
          let type = body?.types.find((ft) => ft.id == t.value.typeId);

          if (!type) return;

          selectedTypeArray.push(type);
        });

        body.types = selectedTypeArray;
        selectedBodyArray.push(body);
      });

      this.rarity.bodies = selectedBodyArray;

      this.rarityService.addRarity(this.rarity).subscribe({
        next: (response) => {
          console.log(response);
          this.form.patchValue({
            rarityId: '',
            all: false,
          });
          this.bodies.clear();
          this.validateService.toucheFields(this.form, false);
          this.getFrontBodies();
          this.getFrontRarities();
          this.disableButton = false;
        },
      });
    } else {
      this.validateService.toucheFields(this.form, true);
    }
  }
}
