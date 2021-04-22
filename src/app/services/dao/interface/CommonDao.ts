// стандартные методы CRUD (create, read, update, delete)

import {Observable} from 'rxjs';

// все методы возвращают Observable - для асинхронности и работы в реактивном стиле
export interface CommonDao<T> {

  // получить все значения
  findAll(): Observable<T[]>;

  // получить одно значение по id
  findById(id: number): Observable<T>; // получение значения по уникальному id

  // обновить значение
  update(id: number, obj: T): Observable<T>;

  // удалить значение
  delete(id: number): Observable<boolean>; // удаление по id

  // добавить значение
  add(obj: T): Observable<T>;

}
