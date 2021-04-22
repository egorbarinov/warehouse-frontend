import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Brand} from '../../model/Brand';
import {DialogService} from '../../services/dialog.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-edit-brand-dialog',
  templateUrl: './edit-brand-dialog.component.html',
  styleUrls: ['./edit-brand-dialog.component.css']
})
export class EditBrandDialogComponent implements OnInit {

  form: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public brand: Brand,
              private dialogRef: MatDialogRef<EditBrandDialogComponent>,
              private dialogService: DialogService,
              private fb: FormBuilder) {
    this.form = fb.group({
      id: [brand.id],
      name: [brand.name, Validators.required],
      abbr: [brand.abbr],
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
    this.dialogService.openConfirmDialog('Удалить бренд ' + this.brand.name + '?')
      .afterClosed().subscribe(res => {
      if (res) {
        this.dialogRef.close('delete');
      }
    });
  }
}
