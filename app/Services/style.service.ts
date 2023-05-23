import { Injectable } from '@angular/core';

@Injectable()
export class StyleService {
  constructor() {}

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
}
