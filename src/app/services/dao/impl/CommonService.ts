import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CommonDao} from '../interface/CommonDao';

// базовые методы доступа к данным, одинаковые для всех классов,
// чтобы не нужно было дублировать весь этот код в каждом классе-сервисе

// JSON формируется автоматически для параметров и результатов

export class CommonService<T> implements CommonDao<T> {

  private readonly url: string;

  constructor(url: string,  // базовый URL для доступа к данным
              private httpClient: HttpClient // для выполнения HTTP запросов
  ) {
    this.url = url;
  }

  add(t: T): Observable<T> {
    return this.httpClient.post<T>(this.url, t);
  }

  delete(id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(this.url + '/' + id);
  }

  findById(id: number): Observable<T> {
    return this.httpClient.get<T>(this.url + '/' + id);
  }

  findAll(): Observable<T[]> {
    return this.httpClient.get<T[]>(this.url);
  }

  refresh(): Observable<T[]> {
    return this.findAll();
  }

  update(id: number, t: T): Observable<T> {
    return this.httpClient.put<T>(this.url + '/' + id, t);
  }
}
