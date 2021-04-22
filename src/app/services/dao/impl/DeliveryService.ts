import {Inject, Injectable, InjectionToken} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

import {CommonService} from './CommonService';
import {DeliveryDao} from '../interface/DeliveryDao';
import {Delivery} from '../../../model/Delivery';
import {Observable} from 'rxjs';
import {saveAs} from 'file-saver';
import {DialogService} from '../../dialog.service';

// глобальная переменная для хранения URL
export const DELIVERIES_URL_TOKEN = new InjectionToken<string>('url');

@Injectable({
  providedIn: 'root'
})

export class DeliveryService extends CommonService<Delivery> implements DeliveryDao {

  constructor(@Inject(DELIVERIES_URL_TOKEN) private baseUrl,
              private http: HttpClient,
              private dialogService: DialogService
  ) {
    super(baseUrl, http);
  }

  findByDateRange(startDate: any, endDate: any): Observable<Delivery[]> {
    let params = new HttpParams();
    if (startDate) {
      params = params.set('first', this.toStringDate(startDate));
    }
    if (endDate) {
      params = params.set('last', this.toStringDate(endDate));
    }
    return this.http.get<Delivery[]>(this.baseUrl, {params});
  }

  getUniqueDeliveriesReport(startDate: any, endDate: any): Observable<any[]> {
    let params = new HttpParams();
    if (startDate) {
      params = params.set('first', this.toStringDate(startDate));
    }
    if (endDate) {
      params = params.set('last', this.toStringDate(endDate));
    }
    return this.http.get<any[]>('https://command-project-warehouse.herokuapp.com/api/v1/deliveries/uniqueDeliveriesReport', {params});
  }

  toStringDate(dateValue: any): string {
    const dateParts = dateValue.toLocaleDateString().split('.');
    return dateParts[2] + '-' + (dateParts[1]) + '-' + dateParts[0];
  }

  addAll(obj: Delivery[]): Observable<boolean> {
    return this.http.post<boolean>('https://command-project-warehouse.herokuapp.com/api/v1/deliveries/grouped-save', obj);
  }

  loadToExcel(data: Delivery[], displayedColumns: string[]): void {
    this.http.post('https://command-project-warehouse.herokuapp.com/api/v1/deliveries/report',
      data, {params: {columns: displayedColumns}, responseType: 'blob'})
      .subscribe(onloadeddata => this.downloadFile(onloadeddata),
        error => this.dialogService.openFailureSnackBar('Произошла ошибка загрузки файла: ' + error.message));
  }

  downloadFile(data: Blob): void {
    saveAs(data, 'report.xls');

    // это второй вариант сохранения, но он рандомно присваивает имя загруженному файлу
    // const url = window.URL.createObjectURL(data);
    // window.open(url);
  }


}
