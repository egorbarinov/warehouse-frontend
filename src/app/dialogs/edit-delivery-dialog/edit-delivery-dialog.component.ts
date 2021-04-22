import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Brand} from '../../model/Brand';
import {BrandService} from '../../services/dao/impl/BrandService';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Delivery} from '../../model/Delivery';
import {DialogService} from '../../services/dialog.service';
import {Shop} from '../../model/Shop';
import {Warehouse} from '../../model/Warehouse';
import {ShopService} from '../../services/dao/impl/ShopService';
import {WarehouseService} from '../../services/dao/impl/WarehouseService';
import {DeliveryTimeService} from '../../services/dao/impl/DeliveryTimeService';
import {DeliveryTime} from '../../model/DeliveryTime';
import {DeliveryType} from '../../model/DeliveryType';
import {deliveryTypeMapper, DeliveryTypeService} from '../../services/dao/impl/DeliveryTypeService';

@Component({
  selector: 'app-edit-delivery-dialog',
  templateUrl: './edit-delivery-dialog.component.html',
  styleUrls: ['./edit-delivery-dialog.component.css']
})
export class EditDeliveryDialogComponent implements OnInit {

  allBrands: Brand[];
  allShops: Shop[];
  allWarehouses: Warehouse[];
  allTimes: DeliveryTime[];
  allTypes: DeliveryType[];
  form: FormGroup;
  todaysDate = new Date();

  constructor(@Inject(MAT_DIALOG_DATA) public delivery: Delivery,
              private dialogRef: MatDialogRef<EditDeliveryDialogComponent>,
              private brandService: BrandService,
              private shopService: ShopService,
              private warehouseService: WarehouseService,
              private deliveryTimeService: DeliveryTimeService,
              private deliveryTypeService: DeliveryTypeService,
              private dialogService: DialogService,
              private fb: FormBuilder) {
    this.form = fb.group({
      id: [delivery.id],
      deliveryDate: [new Date(delivery.deliveryDate), Validators.required],
      deliveryTime: [delivery.deliveryTime, Validators.required],
      carInfo: [delivery.carInfo],
      driverInfo: [delivery.driverInfo],
      brand: [delivery.brand],
      orderNumber: [delivery.orderNumber],
      deliveryType: [delivery.deliveryType, Validators.required],
      sender: [delivery.sender],
      comment: [delivery.comment],
      shop: [delivery.shop],
      numberOfPlaces: [delivery.numberOfPlaces],
      torgNumber: [delivery.torgNumber],
      invoice: [delivery.invoice],
      user: [delivery.user],
      warehouse: [delivery.warehouse, Validators.required],
    });
    console.log(this.form.value.deliveryDate);
  }

  ngOnInit(): void {
    this.brandService.findAll().subscribe(onloadeddata => this.allBrands = onloadeddata,
      error => this.dialogService.openFailureSnackBar('Произошла ошибка загрузки справочника "Бренды": ' + error.message));
    this.shopService.findAll().subscribe(onloadeddata => this.allShops = onloadeddata,
      error => this.dialogService.openFailureSnackBar('Произошла ошибка загрузки справочника "Магазины": ' + error.message));
    this.warehouseService.findAll().subscribe(onloadeddata => this.allWarehouses = onloadeddata,
      error => this.dialogService.openFailureSnackBar('Произошла ошибка загрузки справочника "Склады": ' + error.message));
    this.deliveryTimeService.findAll().subscribe(onloadeddata => this.allTimes = onloadeddata,
      error => this.dialogService.openFailureSnackBar('Произошла ошибка загрузки справочника "Время доставки": ' + error.message));
    this.deliveryTypeService.findAll().subscribe(onloadeddata => this.allTypes = onloadeddata,
      error => this.dialogService.openFailureSnackBar('Произошла ошибка загрузки справочника "Тип доставки": ' + error.message));
  }

  compareFn(o1: any, o2: any): boolean {
    if (o1 === null || o2 === null) {
      return false;
    }
    return (o1.id === o2.id);
  }

  save(): void {
    this.dialogRef.close(this.form.value);
  }

  close(): void {
    this.dialogRef.close();
  }

  delete(): void {
    this.dialogService.openConfirmDialog('Удалить приход № ' + this.delivery.id + '?')
      .afterClosed().subscribe(res => {
      if (res) {
        this.dialogRef.close('delete');
      }
    });
  }

  mapDeliveryType(dt: string): string {
    return deliveryTypeMapper[dt];
  }

}
