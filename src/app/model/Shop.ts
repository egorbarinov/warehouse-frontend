import {Brand} from './Brand';

export class Shop {

  id: number;
  name: string;
  abbr: string;
  brand: Brand;


  constructor(id: number, name: string, abbr: string, brand: Brand) {
    this.id = id;
    this.name = name;
    this.abbr = abbr;
    this.brand = brand;
  }
}
