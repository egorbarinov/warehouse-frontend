import {Component, OnInit, ViewChild} from '@angular/core';
import {Delivery} from '../../model/Delivery';
import {DeliveryService} from '../../services/dao/impl/DeliveryService';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import {User} from '../../model/User';
import {UserService} from '../../services/dao/impl/UserService';
import {DateAdapter} from '@angular/material/core';
import {DeliveryTypeService} from '../../services/dao/impl/DeliveryTypeService';
import {DeliveryTimeService} from '../../services/dao/impl/DeliveryTimeService';
import {WarehouseService} from '../../services/dao/impl/WarehouseService';
import {ShopService} from '../../services/dao/impl/ShopService';
import {BrandService} from '../../services/dao/impl/BrandService';
import {DeliveryType} from '../../model/DeliveryType';
import {DeliveryTime} from '../../model/DeliveryTime';
import {Warehouse} from '../../model/Warehouse';
import {Shop} from '../../model/Shop';
import {Brand} from '../../model/Brand';
import {NgForm} from '@angular/forms';
import {DialogService} from '../../services/dialog.service';

@Component({
  selector: 'app-deliveries',
  templateUrl: './add-deliveries.component.html',
  styleUrls: ['./add-deliveries.component.css']
})
export class AddDeliveriesComponent implements OnInit {
  private currentUser: User;
  pasteTableDisplayedColumns: string[] = ['deliveryDate', 'deliveryTime', 'carInfo', 'driverInfo', 'brand', 'orderNumber',
    'deliveryType', 'sender', 'comment', 'shop', 'numberOfPlaces', 'torgNumber', 'invoice', 'warehouse'];
  pasteTableDataSource = new MatTableDataSource<Delivery>();
  todaysDate: any;
// ----------------------------
  allBrands: Brand[];
  allShops: Shop[];
  allWarehouses: Warehouse[];
  allTimes: DeliveryTime[];
  allTypes: DeliveryType[];

  @ViewChild('copyPasteForm') formGroup;

  constructor(private deliveryService: DeliveryService,
              private userService: UserService,
              private dialog: MatDialog,
              private dateAdapter: DateAdapter<any>,
              private brandService: BrandService,
              private shopService: ShopService,
              private warehouseService: WarehouseService,
              private deliveryTimeService: DeliveryTimeService,
              private deliveryTypeService: DeliveryTypeService,
              private dialogService: DialogService) {
    this.dateAdapter.setLocale('ru-RU');
    this.todaysDate = new Date();
  }

  ngOnInit(): void {
    this.brandService.findAll().subscribe(onloadeddata => this.allBrands = onloadeddata);
    this.shopService.findAll().subscribe(onloadeddata => this.allShops = onloadeddata);
    this.warehouseService.findAll().subscribe(onloadeddata => this.allWarehouses = onloadeddata);
    this.deliveryTimeService.findAll().subscribe(onloadeddata => this.allTimes = onloadeddata);
    this.deliveryTypeService.findAll().subscribe(onloadeddata => this.allTypes = onloadeddata);
    this.userService.findAll().toPromise().then(() => {
      this.currentUser = this.userService.getCurrentUser();
    });
  }


  // ---------------------------------------------------------
  data(event: ClipboardEvent): void {
    const clipboardData = event.clipboardData;
    const pastedText = clipboardData.getData('text');
    const rowData = pastedText.split('\n');
    const dataObject = [];

    rowData.forEach(rd => {
      if (rd !== '') {
        console.log(rd);
        const rowValues = rd.split('\t');
        console.log(rowValues);
        rowValues[rowValues.length - 1] = rowValues[rowValues.length - 1].trim();
        const row = {};
        this.pasteTableDisplayedColumns.forEach((str, index) => {
          // Индекс = 0 , это столбец с датой
          if (index === 0) {
            row[str] = this.toDate(rowValues[index]);
            console.log(row[str]);
          } else if (index === 1) {
            row[str] = this.deliveryTimeService.toDeliveryTime(rowValues[index]);
          } else if (index === 4) {
            row[str] = this.brandService.toBrand(rowValues[index]);
          } else if (index === 6) {
            row[str] = this.deliveryTypeService.toDeliveryType(rowValues[index]);
          } else if (index === 9) {
            row[str] = this.shopService.toShop(rowValues[index]);
          } else if (index === 13) {
            row[str] = this.warehouseService.toWarehouse(rowValues[index]);
          } else {
            row[str] = rowValues[index];
          }
        });
        dataObject.push(row);
      }
    });
    this.pasteTableDataSource = new MatTableDataSource(dataObject);
    console.log(this.pasteTableDataSource);
  }

  send(form: NgForm): void {
    if (form.valid) {
      this.deliveryService.addAll(this.tableToDeliveries(this.pasteTableDataSource))
        .subscribe(() => this.dialogService.openSuccessSnackBar('Приходы добавлены в реестр'),
          error => this.dialogService.openFailureSnackBar('Произошла ошибка: ' + error.message));
    }
    this.pasteTableDataSource = null;
  }

  tableToDeliveries(table: MatTableDataSource<Delivery>): Delivery[] {
    let delivery: Delivery;
    const deliveriesToSend: Delivery[] = [];
    for (const item of table.data) {
      // console.log('prepare to send data: ');
      const goodDate = new Date(item.deliveryDate.getFullYear(), item.deliveryDate.getMonth(), item.deliveryDate.getDate(), 12);
      delivery = new Delivery(
        null,
        goodDate,
        item.deliveryTime,
        item.carInfo,
        item.driverInfo,
        item.brand,
        item.orderNumber,
        item.deliveryType,
        item.sender,
        item.comment,
        item.shop,
        item.numberOfPlaces,
        item.torgNumber,
        item.invoice,
        this.currentUser,
        item.warehouse);
      deliveriesToSend.push(delivery);
    }
    return deliveriesToSend;
  }

  toDate(stringDate: string): Date {
    const dateParts = stringDate.split('.');
    console.log(dateParts);
    const date = new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]), 12);
    console.log(date);
    return date;
  }

  compareFn(o1: any, o2: any): boolean {
    if (o1 === null || o2 === null) {
      return false;
    }
    return (o1.id === o2.id);
  }
}
