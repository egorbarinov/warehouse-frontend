import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Warehouse} from '../../../model/Warehouse';
import {WarehouseDao} from '../interface/WarehouseDao';
import {CommonCachedService} from './CommonCachedService';

// глобальная переменная для хранения URL
export const WAREHOUSES_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})

export class WarehouseService extends CommonCachedService<Warehouse> implements WarehouseDao {

  constructor(@Inject(WAREHOUSES_URL_TOKEN) private baseUrl,
              private http: HttpClient // для выполнения HTTP запросов
  ) {
    super(baseUrl, http);
  }

  toWarehouse(text: string): Warehouse {
    if (this.entities === null) {
      return null;
    }
    const result = this.entities.filter(entity => entity.name === text);
    if (result.length > 0) {
      return result[0];
    }
    return null;
  }
}
