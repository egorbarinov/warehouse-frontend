import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CommonService} from './CommonService';

// Сервис с кэшированием запросов для findAll(). Используется как базовый класс
// для сервисов, загружающих с бэкенда относительно постоянные данные
// (справочники)

export class CommonCachedService<T> extends CommonService<T> {

  entities: T[] = null;

  constructor(url: string, httpClient: HttpClient) {
    super(url, httpClient);
  }

  // Overriding findAll() method to use a cache instead of sending a request to server
  findAll(): Observable<T[]> {
    if (this.entities != null) {
      return of(this.entities);
    }
    return this.refresh();
  }

  // Refreshes cached data
  refresh(): Observable<T[]> {
    const response = super.findAll();
    response.subscribe(entities => this.entities = entities);
    return response;
  }

}
