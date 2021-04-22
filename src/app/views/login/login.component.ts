import {Component, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import {AuthService} from '../../security/auth.service';
import {LoginInfo} from '../../security/login-info';
import {LoaderService} from '../../services/loader.service';
import {DialogService} from '../../services/dialog.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginInfo: LoginInfo = new LoginInfo('', '');
  _authService: AuthService;

  constructor(private router: Router,
              private authService: AuthService,
              private loaderService: LoaderService,
              private dialogService: DialogService) {
    this._authService = authService;
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
     this.authService.loginUser(this.loginInfo).subscribe(
      data => {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        let authorities = '';
        for (const authority of data.authorities) {
          authorities = authorities + authority.authority + ',';
        }
        authorities = authorities.slice(0, -1);
        localStorage.setItem('authorities', authorities);
        this.loaderService.load();
        this.router.navigate(['/deliveries']);
      },
      () => this.dialogService.openFailureSnackBar('Неудачная попытка входа. Проверьте имя пользователя и пароль и повторите попытку.')
    );
  }
 }
