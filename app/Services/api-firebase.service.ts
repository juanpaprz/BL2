import { Injectable } from '@angular/core';
import { AccesoryCode, AccesoryCodes } from '../Entities/AccesoryCode';
import { ElementCode, ElementCodes } from '../Entities/ElementCode';
import { GripCode, GripCodes } from '../Entities/GripCode';
import { SightCode, SightCodes } from '../Entities/SightCode';
import { StockCode, StockCodes } from '../Entities/StockCode';
import { DbFirebaseService } from '../Services/db-firebase.service';
import { forkJoin, Observable } from 'rxjs';

@Injectable()
export class ApiFirebaseService {
  constructor(private dbService: DbFirebaseService) {}

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

  addGripCodes() {
    let observables: Observable<GripCode>[] = [];

    GripCodes.forEach((grip) => {
      grip.id = this.generateId();
      observables.push(this.dbService.addGripCode(grip));
    });

    return forkJoin(observables);
  }

  addStockCodes() {
    let observables: Observable<StockCode>[] = [];

    StockCodes.forEach((stock) => {
      stock.id = this.generateId();
      observables.push(this.dbService.addStockCode(stock));
    });

    return forkJoin(observables);
  }

  addSightCodes() {
    let observables: Observable<SightCode>[] = [];

    SightCodes.forEach((sight) => {
      sight.id = this.generateId();
      observables.push(this.dbService.addSightCode(sight));
    });

    return forkJoin(observables);
  }

  addElementCodes() {
    let observables: Observable<ElementCode>[] = [];

    ElementCodes.forEach((element) => {
      element.id = this.generateId();
      observables.push(this.dbService.addElementCode(element));
    });

    return forkJoin(observables);
  }

  addAccesoryCodes() {
    let observables: Observable<AccesoryCode>[] = [];

    AccesoryCodes.forEach((accesory) => {
      accesory.id = this.generateId();
      observables.push(this.dbService.addAccesoryCode(accesory));
    });

    return forkJoin(observables);
  }

  /*addAllBarrelsTemp() {
    let codes = [
      'BADM',
      'BAGW',
      'BATE',
      'BAHR',
      'BAHP',
      'BAFB',
      'BALF',
      'BALG',
      'BAGR',
      'BALW',
      'BAJD',
      'BARX',
      'BAMG',
      'BAUN',
      'BARB',
      'BALE',
      'BAGN',
      'BATF',
      'BAIN',
      'BAWN',
      'BAGU',
      'BAPR',
      'BAUH',
      'BADV',
      'BAVR',
      'BAIF',
      'BASG',
      'BAKR',
      'BACH',
      'BAMD',
      'BASW',
      'BASC',
      'BAVE',
      'BASP',
      'BABR',
      'BATP',
      'BADC',
      'BASN',
      'BASR',
      'BAHS',
      'BA28',
      'BABK',
      'BAES',
      'BABP',
      'BAKB',
      'BAOG',
      'BASE',
      'BAPO',
      'BAHL',
      'BAKT',
      'BARP',
      'BASF',
      'BALS',
      'BABS',
      'BAOR',
      'BASL',
      'BATL',
      'BALX',
      'BASH',
      'BAEM',
      'BABA',
      'BACM',
      'BAYJ',
      'BABH',
      'BAAC',
      'BABT',
      'BAGT',
      'BACL',
      'BACT',
      'BAHF',
      'BAFL',
      'BANR',
      'BABM',
      'BAAV',
      'BAIC',
      'BARR',
      'BABD',
      'BAHV',
      'BANF',
      'BAPP',
      'BABY',
      'BA12',
      'BACR',
      'BANK',
      'BAAH',
      'BATG',
      'BAWB',
      'BAMN',
      'BASO',
      'BAPF',
      'BAFE',
      'BAMS',
      'BAIV',
      'BALB',
      'BABF',
      'BACB',
      'BAEG',
      'BATS',
      'BAAS',
      'BASM',
      'BAHE',
      'BAGF',
      'BAHM',
      'BACA',
      'BAPM',
      'BAVO',
      'BAST',
      'BALY',
      'BAPT',
      'BADG',
      'BAJR',
      'BARS',
      'BATT',
      'BASS',
      'BAHB',
      'BA13',
      'BAHN',
      'BACC',
      'BAOC',
      'BAIT',
      'BABC',
      'BAHD',
      'BAOM',
      'BATQ',
      'BATW',
      'BATV',
      'BASK',
      'BAKH',
      'BAOO',
      'BADL',
      'BART',
      'BAON',
      'BALD',
      'BASX',
      'BAFK',
      'BACN',
      'BAUX',
    ];

    let names = [
      'Dahlminator',
      `Gwen's Head`,
      'Teapot',
      'Hornet',
      `Hector's Paradise`,
      'Fibber',
      'Lady Fist',
      `Logan's Gun`,
      'Greed',
      'Law',
      'Judge',
      'Rex',
      'Maggie',
      'Unforgiven',
      'Rubi',
      'Little Evie',
      'Grog Nozzle',
      'Thunderball Fists',
      'Infection',
      'Wanderlust',
      'Gunerang',
      'Pocket Rocket',
      'Unkempt Harold',
      'Devastator',
      'Veritas',
      'Infinity',
      'Stinger',
      'Stalker',
      'CHOPPER',
      'Madhous!',
      'Sawbar',
      'Scorpio',
      'Veruc',
      'Seraphim',
      'Bearcat',
      'Toothpick',
      'Damned Cowboy',
      'Stinkpot',
      'Stomper',
      'Hammer Buster',
      'M2828 Thumpson',
      'Bekah',
      'Evil Smasher',
      'Boom Puppy',
      'KerBlaster',
      'Ogre',
      'Seeker',
      'Peak Opener',
      'Hail',
      'Kitten',
      'Rapier',
      'Shredifier',
      'Lead Storm',
      'Bone Shredder',
      'Orc',
      'Slagga',
      'Tattler',
      'Lascaux',
      'Sand Hawk',
      'Emperor',
      'Bane',
      'Commerce',
      'Yellow Jacket',
      'Bitch',
      'Actualizer',
      'Bad Touch',
      'Good Touch',
      'Chulainn',
      'Crit',
      'HellFire',
      'Florentine',
      'Nirvana',
      'Baby Maker',
      'Avenger',
      'Infection Cleaner',
      'Roaster',
      'Badaboom',
      'Hive',
      'Norfleet',
      'Pyrophobia',
      'Bunny',
      '12 Pounder',
      'Creamer',
      'Nukem',
      'Ahab',
      'Tunguska',
      'World Burn',
      'Mongol',
      'Sloth',
      'Pitchfork',
      `Fremington's Edge`,
      'Morningstar',
      'Invader',
      'Longbow',
      'Buffalo',
      'Cobra',
      'Elephant Gun',
      'Trespasser',
      'Amigo Sincero',
      'Skullmasher',
      'Hawk Eye',
      'Godfinger',
      'Hot Mama',
      'Chère-amie',
      'Pimpernel',
      'Volcano',
      'Storm',
      'Lyuda',
      'Patriot',
      'Dog',
      'Jolly Roger',
      'RokSalt',
      'Teeth of Terramorphous',
      `Sledge's Shotgun`,
      'Heart Breaker',
      'Shotgun 1340',
      'Slow Hand',
      'Conference Call',
      'Overcompensator',
      'Interfacer',
      'Butcher',
      'Hydra',
      'Orphan Maker',
      'Triquetra',
      'Twister',
      'Tidal Wave',
      'Striker',
      'Blockhead',
      'Octo',
      'Deliverance',
      'Retcher',
      'Omen',
      'Landscaper',
      'SWORDSPLOSION!!!',
      'Flakker',
      'Carnage',
      'Unicornsplosion',
    ];

    let barrelCodes: BarrelCode[] = [];

    codes.forEach((c, index) => {
      let name = names[index];

      let barrelCode: BarrelCode = {
        id: this.apiService.generateId(),
        code: c,
        name: name,
      };

      barrelCodes.push(barrelCode);
    });

    let observables: Observable<BarrelCode>[] = [];

    barrelCodes.forEach((barrelCode) => {
      observables.push(this.dbService.addBarrelCode(barrelCode));
    });

    return forkJoin(observables);
  } */
}
