import {Component, OnInit, ViewChild} from '@angular/core';
import {Delivery} from '../../model/Delivery';
import {DeliveryService} from '../../services/dao/impl/DeliveryService';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {User} from '../../model/User';
import {UserService} from '../../services/dao/impl/UserService';
import {EditDeliveryDialogComponent} from '../../dialogs/edit-delivery-dialog/edit-delivery-dialog.component';
import {DateAdapter} from '@angular/material/core';
import {MatSort, MatSortable} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {FormControl, FormGroup} from '@angular/forms';
import {DialogService} from '../../services/dialog.service';
import {deliveryTypeMapper} from '../../services/dao/impl/DeliveryTypeService';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.css']
})
export class DeliveriesComponent implements OnInit {

  displayedColumns: string[] = ['No', 'id', 'deliveryDate', 'deliveryTime', 'carInfo', 'driverInfo', 'brand', 'orderNumber',
    'deliveryType', 'sender', 'comment', 'shop', 'numberOfPlaces', 'torgNumber', 'invoice', 'warehouse'];
  dataSource = new MatTableDataSource<Delivery>();
  dialogConfig = new MatDialogConfig();
  currentUser: User;
  displayedColumns2: string[];
  searchKey = '';
  startDate = new Date();
  endDate = new Date();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  range = new FormGroup({
    start: new FormControl(this.startDate),
    end: new FormControl(this.endDate)
  });
  onlyMyRecords: boolean;
  onlyMyBrands: boolean;
  isBrandManager: boolean;
  isAdmin: boolean;
  filter = '~'; // любое значение, без него фильтр не работает

  constructor(private deliveryService: DeliveryService,
              private userService: UserService,
              private dialog: MatDialog,
              private dialogService: DialogService,
              private dateAdapter: DateAdapter<any>) {
    this.dateAdapter.setLocale('ru-RU');
    // this.endDate.setDate(this.startDate.getDate() + 7);
  }

  ngOnInit(): void {
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dialogConfig.width = '60%';
    this.dialogConfig.height = 'auto';

    this.userService.refresh().subscribe(() => {
      this.currentUser = this.userService.getCurrentUser();
      this.checkUserRoles();
    });
    this.deliveryService.findByDateRange(this.range.controls.start.value, this.range.controls.end.value)
      .subscribe(deliveries => {
        // console.log(deliveries);
        this.dataSource.data = deliveries;  // this forces mat-table to refresh data
        this.dataSource.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'deliveryTime':
              return item.deliveryTime.deliveryTime;
            case 'brand':
              return item.brand.name;
            case 'deliveryType':
              return item.deliveryType.type;
            case 'shop':
              return item.shop.name;
            case 'warehouse':
              return item.warehouse.name;
            default:
              return item[property];
          }
        };
        this.sort.sort(({id: 'deliveryDate', start: 'asc'}) as MatSortable);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.paginator._intl.itemsPerPageLabel = 'Поставок на странице:';
        // В предикате фильтра реализован отбор по id текущего пользователя и id его брендов
        this.dataSource.filterPredicate = (delivery, filter) => {
          if (this.onlyMyRecords) {
            if (delivery.user.id !== this.currentUser.id) {
              return false;
            }
          }
          if (this.onlyMyBrands) {
            return this.isMyBrand(delivery.brand.id);
          }
          return true;
        };
      });
  }

  addDelivery(): void {
    this.dialogConfig.data = new Delivery(null, new Date(), null, '', '',
      null, '', null, '', '', null, '',
      '', '', this.currentUser, null);
    const dialogRef = this.dialog.open(EditDeliveryDialogComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(delivery => {
      if (delivery) {
        delivery.deliveryDate.setHours(12);
        console.log(delivery);
        this.deliveryService.add(delivery)
          .subscribe(newDelivery =>
              this.dialogService.openSuccessSnackBar('Создан приход № ' + newDelivery.id + ' от ' + newDelivery.deliveryDate),
            error => this.dialogService.openFailureSnackBar('Произошла ошибка: ' + error.message),
            () => this.reloadData());
      }
    });
  }

  editDelivery(row): void {
    // не разрешаем редактировать никому, кроме администраторов и бренд-менеджеров
    if (!(this.isAdmin || this.isBrandManager)) {
      return;
    }
    // не разрешаем редактировать бренд-менеджеру чужие бренды
    if (this.isBrandManager && (!this.isMyBrand(row.brand.id))) {
      return;
    }
    this.dialogConfig.data = row;
    const dialogRef = this.dialog.open(EditDeliveryDialogComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(delivery => {
      if (delivery) {
        if (typeof delivery === 'string') {
          if (delivery === 'delete') {
            this.deliveryService.delete(row.id).subscribe(() => this.reloadData(), () => this.reloadData());
          }
        } else {
          delivery.deliveryDate.setHours(12);
          console.log(delivery);
          this.deliveryService.update(delivery.id, delivery).subscribe(() => this.dialogService.openSuccessSnackBar('Данные сохранены'),
            error => this.dialogService.openFailureSnackBar('Произошла ошибка: ' + error.message),
            () => this.reloadData());
        }
      }
    });
  }

  reloadData(): void {
    // request new data only when both start and end dates have been set
    if (!(this.range.controls.end.value && this.range.controls.start.value)) {
      return;
    }
    this.deliveryService.findByDateRange(this.range.controls.start.value, this.range.controls.end.value)
      .subscribe(deliveries => {
        this.dataSource.data = deliveries;  // this forces mat-table to refresh data
      });
  }

  loadToExcel(): void {
    this.dialogService.openColumnSelectDialog(this.displayedColumns).afterClosed().subscribe(result => {
      if (result) {
        this.deliveryService.loadToExcel(this.dataSource.filteredData, result);
      }
    });
  }

  resetFilter(): void {
    this.onlyMyRecords = false;
    this.onlyMyBrands = false;
    this.range.controls.start.setValue(this.startDate);
    this.range.controls.end.setValue(this.endDate);
    this.reloadData();
  }

  mapDeliveryType(dt: string): string {
    return deliveryTypeMapper[dt];
  }

  checkUserRoles(): void {
    for (const role of this.currentUser.roles) {
      if (role.role === 'ROLE_BRAND_MANAGER') {
        this.isBrandManager = true;
      }
      if (role.role === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    }
  }

  isMyBrand(id: number): boolean {
    if (!this.currentUser) {
      return false;
    }
    for (const brand of this.currentUser.brands) {
      if (brand.id === id) {
        return true;
      }
    }
    return false;
  }

  applyFilter(): void {
    this.dataSource.filter = this.filter;
  }
}
