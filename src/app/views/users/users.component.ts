import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {User} from '../../model/User';
import {UserService} from '../../services/dao/impl/UserService';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {EditUserDialogComponent} from '../../dialogs/edit-user-dialog/edit-user-dialog.component';
import {Role} from '../../model/Role';
import {Brand} from '../../model/Brand';
import {MatTableDataSource} from '@angular/material/table';
import {AuthService} from '../../security/auth.service';
import {roleMapper} from '../../services/dao/impl/RoleService';
import {DialogService} from '../../services/dialog.service';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  displayedColumns: string[] = ['No', 'username', 'fullName', 'email', 'phone', 'brands', 'roles'];
  dataSource = new MatTableDataSource<User>();
  dialogConfig = new MatDialogConfig();
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService,
              private authService: AuthService,
              private dialog: MatDialog,
              private dialogService: DialogService,
              private ref: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.dialogConfig.disableClose = true;
    this.dialogConfig.autoFocus = true;
    this.dataSource.filterPredicate = (user, filter: string): boolean => (user.username !== filter);
    this.dataSource.filter = this.authService.getUserName();
    this.userService.findAll().subscribe(users => {
      this.dataSource.data = users;  // this forces mat-table to refresh data
      this.ref.detectChanges();
      this.dataSource.sort = this.sort;
    });
  }

  addUser(): void {
    this.dialogConfig.data = new User(null, '', '', '', '', '', [], []);
    const dialogRef = this.dialog.open(EditUserDialogComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(user => {
      if (user) {
        console.log('Created');
        console.log(user);
        this.userService.add(user).subscribe(() => this.dialogService.openSuccessSnackBar('Пользователь добавлен'),
          error => this.dialogService.openFailureSnackBar('Произошла ошибка: ' + error.message), () => this.reloadData());
      }
    });
  }

  editUser(row): void {
    this.dialogConfig.data = row;
    const dialogRef = this.dialog.open(EditUserDialogComponent, this.dialogConfig);
    dialogRef.afterClosed().subscribe(user => {
      if (user) {
        if (typeof user === 'string') {
          if (user === 'delete') {
            this.userService.delete(row.id).subscribe(() => this.reloadData(), () => this.reloadData());
          }
        } else {
          this.userService.update(user.id, user).subscribe(() => this.dialogService.openSuccessSnackBar('Данные сохранены'),
            error => this.dialogService.openFailureSnackBar('Произошла ошибка: ' + error.message), () => this.reloadData());
        }
      }
    });
  }

  reloadData(): void {
    this.userService.refresh().subscribe(users => {
      this.dataSource.data = users;  // this forces mat-table to refresh data
    });
  }

  getFormattedRoles(roles: Role[]): string {
    let rolesList = '';
    for (let i = 0; i < roles.length; i++) {
      rolesList = rolesList + roleMapper[roles[i].role];
      if (i < roles.length - 1) {
        rolesList = rolesList + ', ';
      }
    }
    return rolesList;
  }

  getFormattedBrands(brands: Brand[]): string {
    let brandsList = '';
    for (let i = 0; i < brands.length; i++) {
      brandsList = brandsList + brands[i].abbr;
      if (i < brands.length - 1) {
        brandsList = brandsList + ', ';
      }
    }
    return brandsList;
  }

}
