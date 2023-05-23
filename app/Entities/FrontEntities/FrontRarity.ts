import { FrontBody } from '../../Entities/FrontEntities/FrontBody';

export class FrontRarity {
  id: string = '';
  code: string = '';
  level: number = 0;
  name: string = '';
  color: string = '';
  colorTxt: string = '';
  bodies: FrontBody[] = [];
}
