import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserDao} from '../interface/UserDao';
import {User} from '../../../model/User';
import {CommonCachedService} from './CommonCachedService';
import {AuthService} from '../../../security/auth.service';

// глобальная переменная для хранения URL
export const USERS_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})

// благодаря DAO и единому интерфейсу - мы можем вынести общую реализация в класс выше и избежать дублирования кода
// классу остается только реализовать свои специфичные методы доступа к данным
export class UserService extends CommonCachedService<User> implements UserDao {

  constructor(@Inject(USERS_URL_TOKEN) private baseUrl,
              private authService: AuthService,
              private http: HttpClient // для выполнения HTTP запросов
  ) {
    super(baseUrl, http);
  }

  getCurrentUser(): User {
    const username = this.authService.getUserName();
    if (this.entities === null) { return null; }
    const result = this.entities.filter(entity => entity.username === username);
    if (result.length > 0) {
        return result[0];
      }
    return null;
  }
}
