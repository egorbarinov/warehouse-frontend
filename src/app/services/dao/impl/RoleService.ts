import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Role} from '../../../model/Role';
import {RoleDao} from '../interface/RoleDao';
import {CommonCachedService} from './CommonCachedService';

export const roleMapper = {
  ROLE_ADMIN : 'Администратор',
  ROLE_BRAND_MANAGER: 'Бренд-менеджер',
  ROLE_WAREHOUSE: 'Оператор склада'
};

// глобальная переменная для хранения URL
export const ROLES_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})

export class RoleService extends CommonCachedService<Role> implements RoleDao {

  constructor(@Inject(ROLES_URL_TOKEN) private baseUrl,
              private http: HttpClient // для выполнения HTTP запросов
  ) {
    super(baseUrl, http);
    roleMapper.ROLE_ADMIN = 'Администратор';
  }

  toRole(text: string): Role {
    if (this.entities === null) { return null; }
    const result = this.entities.filter(entity => entity.role === text);
    if (result.length > 0) {
      return result[0];
    }
    return null;
  }

}
