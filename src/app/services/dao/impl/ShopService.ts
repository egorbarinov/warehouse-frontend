import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ShopDao} from '../interface/ShopDao';
import {Shop} from '../../../model/Shop';
import {CommonCachedService} from './CommonCachedService';

// глобальная переменная для хранения URL
export const SHOPS_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})

export class ShopService extends CommonCachedService<Shop> implements ShopDao {

  constructor(@Inject(SHOPS_URL_TOKEN) private baseUrl,
              private http: HttpClient // для выполнения HTTP запросов
  ) {
    super(baseUrl, http);
  }

  toShop(text: string): Shop {
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
