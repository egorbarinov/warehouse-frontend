import {DeliveryTime} from './DeliveryTime';
import {Brand} from './Brand';
import {DeliveryType} from './DeliveryType';
import {User} from './User';
import {Shop} from './Shop';
import {Warehouse} from './Warehouse';

export class Delivery {
  id: number;
  deliveryDate: Date;
  deliveryTime: DeliveryTime;
  carInfo: string;
  driverInfo: string;
  brand: Brand;
  orderNumber: string;
  deliveryType: DeliveryType;
  sender: string;
  comment: string;
  shop: Shop;
  numberOfPlaces: string;
  torgNumber: string;
  invoice: string;
  user: User;
  warehouse: Warehouse;


  constructor(id: number, deliveryDate: Date, deliveryTime: DeliveryTime,
              carInfo: string, driverInfo: string, brand: Brand,
              orderNumber: string, deliveryType: DeliveryType, sender: string,
              comment: string, shop: Shop, numberOfPlaces: string,
              torgNumber: string, invoice: string, user: User, warehouse: Warehouse) {
    this.id = id;
    this.deliveryDate = deliveryDate;
    this.deliveryTime = deliveryTime;
    this.carInfo = carInfo;
    this.driverInfo = driverInfo;
    this.brand = brand;
    this.orderNumber = orderNumber;
    this.deliveryType = deliveryType;
    this.sender = sender;
    this.comment = comment;
    this.shop = shop;
    this.numberOfPlaces = numberOfPlaces;
    this.torgNumber = torgNumber;
    this.invoice = invoice;
    this.user = user;
    this.warehouse = warehouse;
  }
}
