import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AtLeastOneCheckbox,
  ValidationService,
} from '../../Services/validation.service';
import { RarityCode } from '../../Entities/RarityCode';
import { RarityControllerService } from '../../Services/Controllers/rarity-controller.service';
import { BodyControllerService } from '../../Services/Controllers/body-controller.service';
import { FrontBody } from '../../Entities/FrontEntities/FrontBody';

@Component({
  selector: 'app-api-rarity',
  templateUrl: './api-rarity.component.html',
  styleUrls: ['./api-rarity.component.css'],
})
export class ApiRarityComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  rarityCodes: RarityCode[] = [];

  frontBodies: FrontBody[] = [];

  constructor(
    private rarityService: RarityControllerService,
    private validateService: ValidationService,
    private bodyService: BodyControllerService
  ) {}

  get bodies() {
    return this.form.get('bodies') as FormArray;
  }

  ngOnInit() {
    this.form = new FormGroup({
      rarityId: new FormControl('', Validators.required),
      bodies: new FormArray([]),
    });

    this.getRarityCodes();
    this.getFrontBodies();
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
              types: new FormArray([], AtLeastOneCheckbox()),
            });
            this.bodies.push(formBody);

            $('collapse' + frontB.code);

            let typesArray = formBody.get('types') as FormArray;

            frontB.types.forEach((type) => {
              typesArray.push(
                new FormGroup({
                  value: new FormControl({ value: false, disabled: true }),
                  typeId: new FormControl(type.id),
                })
              );
            });
          });
        }
      },
    });
  }

  isFieldValid(field: string): boolean {
    return this.validateService.isFieldValid(this.form, field);
  }

  setInvalidClass(field: string) {
    return this.validateService.setInvalidClass(this.form, field);
  }
}
