import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BrandDao} from '../interface/BrandDao';
import {Brand} from '../../../model/Brand';
import {CommonCachedService} from './CommonCachedService';

// глобальная переменная для хранения URL
export const BRANDS_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})

export class BrandService extends CommonCachedService<Brand> implements BrandDao {

  constructor(@Inject(BRANDS_URL_TOKEN) private baseUrl,
              private http: HttpClient // для выполнения HTTP запросов
  ) {
    super(baseUrl, http);
  }

  toBrand(text: string): Brand {
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
