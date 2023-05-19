import { Injectable } from '@angular/core';

@Injectable()
export class ApiFirebaseService {
  constructor() {}

  generateId() {
    const CHARS =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

    let id = '';
    for (let i = 0; i < 18; i++) {
      id += CHARS[Math.floor(Math.random() * CHARS.length)];
    }

    id = [
      id.slice(0, 3),
      '-',
      id.slice(3, 6),
      '-',
      id.slice(6, 9),
      '-',
      id.slice(9, 12),
      '-',
      id.slice(12, 15),
      '-',
      id.slice(15, 18),
    ].join('');

    return id;
  }
}
