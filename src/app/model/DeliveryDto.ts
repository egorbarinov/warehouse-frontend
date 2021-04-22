export class DeliveryDto {
  deliveryDate: string;    // только дата, без времени
  deliveryTime: string;  // по факту - Enum
  carInfo: string;
  driverInfo: string;
  brand: string;
  orderNumber: string;
  deliveryType: string;    // по факту - Enum
  sender: string;
  comment: string;
  shop: string;
  numberOfPlaces: string;
  torgNumber: string;
  invoice: string;
  // user: string;


  constructor() {
  }

  // public buildDelivery(deliveryDto: DeliveryDto): Delivery {
  //   return new Delivery(null, new Date(), deliveryDto.deliveryTime, deliveryDto.carInfo, deliveryDto.driverInfo,
  //     deliveryDto.brand, deliveryDto.orderNumber, deliveryDto.deliveryType, deliveryDto.sender, deliveryDto.comment, deliveryDto.shop,
  //     deliveryDto.numberOfPlaces, deliveryDto.torgNumber, deliveryDto.invoice);
  // }
}
