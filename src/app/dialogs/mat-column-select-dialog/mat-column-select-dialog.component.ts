import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSelectionList} from '@angular/material/list';

@Component({
  selector: 'app-column-select-dialog',
  templateUrl: './mat-column-select-dialog.component.html',
  styleUrls: ['./mat-column-select-dialog.component.css']
})
export class MatColumnSelectDialogComponent implements OnInit {

  private columnsMapper = {
    No: '№ п/п',
    id: 'ID',
    deliveryDate: 'Дата',
    deliveryTime: 'Время',
    carInfo: 'Машина',
    driverInfo: 'Водитель',
    brand: 'Бренд',
    orderNumber: '№ внутреннего заказа',
    deliveryType: 'Тип доставки',
    sender: 'Отправитель',
    comment: 'Комментарий',
    shop: 'Магазин',
    numberOfPlaces: 'Количество',
    torgNumber: 'Торг-12',
    invoice: 'Счет-фактура',
    warehouse: 'Склад'
  };

  selectedColumnsControl = new FormControl();

  @ViewChild('columns') columns: MatSelectionList;

  constructor(@Inject(MAT_DIALOG_DATA) public selectedColumns: string[]) {
  }

  ngOnInit(): void {
    this.columns.selectAll();
  }

  onSelectAll(): void {
    this.columns.selectAll();
  }

  onReset(): void {
    this.columns.deselectAll();
  }

  mapColumn(columnName: string): string {
    return this.columnsMapper[columnName];
  }
}
