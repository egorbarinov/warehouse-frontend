import {Component, OnInit} from '@angular/core';
import {User} from '../../model/User';
import {UserService} from '../../services/dao/impl/UserService';
import {Brand} from '../../model/Brand';
import {Role} from '../../model/Role';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AuthService} from '../../security/auth.service';
import {DialogService} from '../../services/dialog.service';
import {roleMapper} from '../../services/dao/impl/RoleService';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  form: FormGroup;

  constructor(private userService: UserService,
              private fb: FormBuilder,
              private authService: AuthService,
              private dialogService: DialogService) {
  }

  ngOnInit(): void {
     this.userService.findAll().subscribe(() => {
      this.user = this.userService.getCurrentUser();
      if (!this.user) {
        this.authService.logoutUser();
      }
      this.form = this.fb.group({
        username: [this.user.username],
        fullName: [this.user.fullName],
        email: [this.user.email],
        phone: [this.user.phone],
      });
    });
  }

  saveProfile(): void {
    this.user.fullName = this.form.controls.fullName.value;
    this.user.email = this.form.controls.email.value;
    this.user.phone = this.form.controls.phone.value;
    this.userService.update(this.user.id, this.user)
      .subscribe(() => this.dialogService.openSuccessSnackBar('Профиль пользователя обновлен'),
        error => this.dialogService.openFailureSnackBar('Произошла ошибка: ' + error.message), () => this.loadUser());
  }

  reset(): void {
      this.form.controls.fullName.setValue(this.user.fullName);
      this.form.controls.email.setValue(this.user.email);
      this.form.controls.phone.setValue(this.user.phone);
      this.form.markAsPristine();
  }

  private loadUser(): void {
    this.userService.findAll().subscribe(() => {
      this.user = this.userService.getCurrentUser();
      this.form.markAsPristine();
    });
  }

  changePassword(): void {
    console.log('Change password');
    this.dialogService.openPasswordDialog().afterClosed().subscribe(password => {
      if (password) {
        this.user.password = password;
        this.userService.update(this.user.id, this.user)
          .subscribe(() => this.dialogService.openSuccessSnackBar('Пароль изменен'),
            error => this.dialogService.openFailureSnackBar('Произошла ошибка: ' + error.message));
      }
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

  logout(): void {
    this.authService.logoutUser();
  }


}
