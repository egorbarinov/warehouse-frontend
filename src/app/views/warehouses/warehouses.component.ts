import {Component, OnInit} from '@angular/core';
import {Warehouse} from '../../model/Warehouse';
import {WarehouseService} from '../../services/dao/impl/WarehouseService';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {EditWarehouseDialogComponent} from '../../dialogs/edit-warehouse-dialog/edit-warehouse-dialog.component';
import {MatTableDataSource} from '@angular/material/table';
import {DialogService} from '../../services/dialog.service';

@Component({
  selector: 'app-warehouses',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.css']
})
export class WarehousesComponent implements OnInit {

  displayedColumns: string[] = ['No', 'name', 'abbr'];
  dataSource: MatTableDataSource<Warehouse>;
  dialogConfig = new MatDialogConfig();

  constructor(private warehouseService: WarehouseService,
              private dialog: MatDialog,
              private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dataSource = new MatTableDataSource<Warehouse>();
    this.warehouseService.findAll().subscribe(warehouses => {
      this.dataSource.data = warehouses;  // this forces mat-table to refresh data
    });
  }

  addWarehouse(): void {
    this.dialogConfig.data = new Warehouse(null, '', '');
    const dialogRef = this.dialog.open(EditWarehouseDialogComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(warehouse => {
      if (warehouse) {
        this.warehouseService.add(warehouse).subscribe(() => this.dialogService.openSuccessSnackBar('Склад добавлен'),
          error => this.dialogService.openFailureSnackBar('Произошла ошибка: ' + error.message), () => this.reloadData());
      }
    });
  }

  editWarehouse(row): void {
    this.dialogConfig.data = row;
    const dialogRef = this.dialog.open(EditWarehouseDialogComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(warehouse => {
      if (warehouse) {
        if (typeof warehouse === 'string') {
          if (warehouse === 'delete') {
            this.warehouseService.delete(row.id).subscribe(() => this.reloadData(), () => this.reloadData());
          }
        } else {
          this.warehouseService.update(warehouse.id, warehouse).subscribe(() => this.dialogService.openSuccessSnackBar('Данные сохранены'),
            error => this.dialogService.openFailureSnackBar('Произошла ошибка: ' + error.message), () => this.reloadData());
        }
      } else {
        this.reloadData();
      }
    });
  }

  reloadData(): void {
    this.warehouseService.refresh().subscribe(warehouses => {
      this.dataSource.data = warehouses;  // this forces mat-table to refresh data
    });
  }

}
