import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {Shop} from '../../model/Shop';
import {ShopService} from '../../services/dao/impl/ShopService';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatTableDataSource} from '@angular/material/table';
import {EditShopDialogComponent} from '../../dialogs/edit-shop-dialog/edit-shop-dialog.component';
import {DialogService} from '../../services/dialog.service';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent implements OnInit {

  displayedColumns: string[] = ['No', 'name', 'abbr', 'brand'];
  dataSource = new MatTableDataSource<Shop>();
  dialogConfig = new MatDialogConfig();
  @ViewChild(MatSort) sort: MatSort;

  constructor(private shopService: ShopService,
              private dialog: MatDialog,
              private dialogService: DialogService,
              private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.shopService.findAll().subscribe(shops => {
      this.dataSource.data = shops;  // this forces mat-table to refresh data
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case 'brand':
            return item.brand.name;
          default:
            return item[property];
        }
      };
      this.ref.detectChanges();
      this.dataSource.sort = this.sort;
    });
  }

  addShop(): void {
    this.dialogConfig.data = new Shop(null, '', '', null);
    const dialogRef = this.dialog.open(EditShopDialogComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(shop => {
      if (shop) {
        this.shopService.add(shop).subscribe(() => this.dialogService.openSuccessSnackBar('Магазин добавлен'),
          error => this.dialogService.openFailureSnackBar('Произошла ошибка: ' + error.message), () => this.reloadData());
      }
    });
  }

  editShop(row): void {
    this.dialogConfig.data = row;
    const dialogRef = this.dialog.open(EditShopDialogComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(shop => {
      if (shop) {
        if (typeof shop === 'string') {
          if (shop === 'delete') {
            this.shopService.delete(row.id).subscribe(() => this.reloadData(), () => this.reloadData());
          }
        } else {
          this.shopService.update(shop.id, shop).subscribe(() => this.dialogService.openSuccessSnackBar('Данные сохранены'),
            error => this.dialogService.openFailureSnackBar('Произошла ошибка: ' + error.message), () => this.reloadData());
        }
      }
    });
  }

  reloadData(): void {
    this.shopService.refresh().subscribe(onloadeddata => {
      this.dataSource.data = onloadeddata;  // this forces mat-table to refresh data
    });
  }

}
