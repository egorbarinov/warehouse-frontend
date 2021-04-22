import {Injectable} from '@angular/core';
import {UserService} from './dao/impl/UserService';
import {BrandService} from './dao/impl/BrandService';
import {ShopService} from './dao/impl/ShopService';
import {WarehouseService} from './dao/impl/WarehouseService';
import {DeliveryTimeService} from './dao/impl/DeliveryTimeService';
import {DeliveryTypeService} from './dao/impl/DeliveryTypeService';


// Сервис, загружающий все справочники при старте приложения.
// Все используемые здесь сервисы наследуются от CommonCachedService
// и имеют внутренний кэш сущностей (справочников)
@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(private userService: UserService,
              private brandService: BrandService,
              private shopService: ShopService,
              private warehouseService: WarehouseService,
              private deliveryTimeService: DeliveryTimeService,
              private deliveryTypeService: DeliveryTypeService) {
  }

  async load(): Promise<void> {
    await this.userService.findAll();
    await this.brandService.findAll();
    await this.shopService.findAll();
    await this.warehouseService.findAll();
    await this.deliveryTimeService.findAll();
    await this.deliveryTypeService.findAll();
  }

}
