import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RarityControllerService } from '../../Services/Controllers/rarity-controller.service';
import { RarityCode } from '../../Entities/RarityCode';
import { ValidationService } from '../../Services/validation.service';

@Component({
  selector: 'app-api-rarity-code',
  templateUrl: './api-rarity-code.component.html',
  styleUrls: ['./api-rarity-code.component.css'],
})
export class ApiRarityCodeComponent implements OnInit {
  constructor(
    private validateService: ValidationService,
    private rarityService: RarityControllerService
  ) {}

  form: FormGroup = new FormGroup({});

  rarityCodes: RarityCode[] = [];

  rarityCode: RarityCode = {
    id: '',
    code: '',
    level: 0,
    name: '',
    color: '',
    colorTxt: '',
  };

  ngOnInit() {
    this.form = new FormGroup({
      code: new FormControl('', [
        Validators.required,
        Validators.maxLength(4),
        Validators.minLength(4),
      ]),
      level: new FormControl(0, [Validators.required, Validators.min(1)]),
      name: new FormControl('', Validators.required),
      colorTxt: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required),
    });

    this.getRarityCodes();
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

  isFieldValid(field: string): boolean {
    return this.validateService.isFieldValid(this.form, field);
  }

  setInvalidClass(field: string) {
    return this.validateService.setInvalidClass(this.form, field);
  }

  hexToRgb(hex: string) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  setRarityStyle(color: string) {
    let rgb = this.hexToRgb(color);
    if (rgb)
      return { 'background-color': `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)` };
  }

  setEffervescentClass(color: string) {
    if (color == 'Effervescent') return 'wrapper';
  }

  addRarityCode() {
    if (this.form.valid) {
      this.rarityCode.code = this.form.value.code;
      this.rarityCode.level = this.form.value.level;
      this.rarityCode.name = this.form.value.name;
      this.rarityCode.colorTxt = this.form.value.colorTxt;
      this.rarityCode.color =
        this.form.value.code == 'RRRN'
          ? this.form.value.colorTxt
          : this.form.value.color;

      this.rarityService.addRarityCode(this.rarityCode).subscribe({
        next: (response) => {
          console.log(response);
          this.form.patchValue({
            code: '',
            level: 0,
            name: '',
            colorTxt: '',
            color: '',
          });
          this.validateService.toucheFields(this.form, false);
          this.getRarityCodes();
        },
      });
    } else {
      this.validateService.toucheFields(this.form, true);
    }
  }
}
