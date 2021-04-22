import {MatConfirmDialogComponent} from '../dialogs/mat-confirm-dialog/mat-confirm-dialog.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Injectable} from '@angular/core';
import {MatPasswordDialogComponent} from '../dialogs/mat-password-dialog/mat-password-dialog.component';
import {MatColumnSelectDialogComponent} from '../dialogs/mat-column-select-dialog/mat-column-select-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';

// Сервис предназначенный для отображения разных диалогов пользователю
@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar) { }

  openConfirmDialog(msg): MatDialogRef<MatConfirmDialogComponent, any> {
   return this.dialog.open(MatConfirmDialogComponent, {
      disableClose: true,
      data : {
        message : msg
      }
    });
  }

  openPasswordDialog(): MatDialogRef<MatPasswordDialogComponent, any> {
   return this.dialog.open(MatPasswordDialogComponent, {
      disableClose: true});
  }

  openColumnSelectDialog(displayedColumns: string[]): MatDialogRef<MatColumnSelectDialogComponent, any> {
   return this.dialog.open(MatColumnSelectDialogComponent, {
      disableClose: true, width: '60%', data: displayedColumns});
  }

  // Snackbar that opens with success background
  openSuccessSnackBar(msg: string): void {
    this.snackBar.open(msg, 'OK', {
      duration: 3000,
      panelClass: ['ok-snackbar']
    });
  }

  // Snackbar that opens with failure background
  openFailureSnackBar(err: string): void {
    console.log('Error occurred: ' + err);
    this.snackBar.open(err, 'Скрыть', {
      duration: 3000,
      panelClass: ['error-snackbar']
    });
  }

}
