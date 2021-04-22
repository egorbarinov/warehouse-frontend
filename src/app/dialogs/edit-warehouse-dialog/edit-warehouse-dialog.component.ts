import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Warehouse} from '../../model/Warehouse';
import {DialogService} from '../../services/dialog.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-warehouse-dialog',
  templateUrl: './edit-warehouse-dialog.component.html',
  styleUrls: ['./edit-warehouse-dialog.component.css']
})
export class EditWarehouseDialogComponent implements OnInit {

  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public warehouse: Warehouse,
              private dialogRef: MatDialogRef<EditWarehouseDialogComponent>,
              private dialogService: DialogService,
              private fb: FormBuilder) {
    this.form = fb.group({
      id: [warehouse.id],
      name: [warehouse.name, Validators.required],
      abbr: [warehouse.abbr],
    });
  }

  ngOnInit(): void {
  }

  save(): void {
    this.dialogRef.close(this.form.value);
  }

  close(): void {
    this.dialogRef.close();
  }

  delete(): void {
    this.dialogService.openConfirmDialog('Удалить склад ' + this.warehouse.name + '?')
      .afterClosed().subscribe(res => {
      if (res) {
        this.dialogRef.close('delete');
      }
    });
  }
}
