import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Shop} from '../../model/Shop';
import {Brand} from '../../model/Brand';
import {BrandService} from '../../services/dao/impl/BrandService';
import {DialogService} from '../../services/dialog.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-shop-dialog',
  templateUrl: './edit-shop-dialog.component.html',
  styleUrls: ['./edit-shop-dialog.component.css']
})
export class EditShopDialogComponent implements OnInit {

  allBrands: Brand[];
  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public shop: Shop,
              private dialogRef: MatDialogRef<EditShopDialogComponent>,
              private brandService: BrandService,
              private dialogService: DialogService,
              private fb: FormBuilder) {
    this.form = fb.group({
      id: [shop.id],
      name: [shop.name, Validators.required],
      abbr: [shop.abbr],
      brand: [shop.brand, Validators.required]
    });
  }

  ngOnInit(): void {
    this.brandService.findAll().subscribe(onloadeddata => this.allBrands = onloadeddata,
      error => this.dialogService.openFailureSnackBar('Произошла ошибка загрузки справочника "Бренды": ' + error.message));
  }

  compareFn(o1: any, o2: any): boolean {
    if (o1 === null || o2 === null) { return false; }
    return (o1.id === o2.id);
  }

  save(): void {
    this.dialogRef.close(this.form.value);
  }

  close(): void {
    this.dialogRef.close();
  }

  delete(): void {
    this.dialogService.openConfirmDialog('Удалить магазин ' + this.shop.name + '?')
      .afterClosed().subscribe(res => {
      if (res) {
        this.dialogRef.close('delete');
      }
    });
  }

}
