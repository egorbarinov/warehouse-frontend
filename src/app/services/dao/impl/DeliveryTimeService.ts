import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DeliveryTime} from '../../../model/DeliveryTime';
import {DeliveryTimeDao} from '../interface/DeliveryTimeDao';
import {CommonCachedService} from './CommonCachedService';

// глобальная переменная для хранения URL
export const DELIVERY_TIMES_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})

export class DeliveryTimeService extends CommonCachedService<DeliveryTime> implements DeliveryTimeDao {

  constructor(@Inject(DELIVERY_TIMES_URL_TOKEN) private baseUrl,
              private http: HttpClient // для выполнения HTTP запросов
  ) {
    super(baseUrl, http);
  }

  toDeliveryTime(text: string): DeliveryTime {
    if (this.entities === null) { return null; }
    const result = this.entities.filter(entity => entity.deliveryTime === text);
    if (result.length > 0) {
      return result[0];
    }
    return null;
  }
}
