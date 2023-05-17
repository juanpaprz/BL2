import { Type } from '../../Entities/Type';

export class FrontBody {
  id: string = '';
  code: string = '';
  name: string = '';
  types: Type[] = [];
}
