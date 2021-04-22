import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from './security/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();

  // тип устройства - на будущее
  isMobile: boolean;
  isTablet: boolean;

  title = 'warehouse';
  contentMargin = 260;

  // параметры бокового меню с категориями
  menuOpened = true;  // по умолчанию - открыто
  _authService: AuthService;

  constructor(private authService: AuthService) {
    this._authService = authService;
  }

  ngOnInit(): void {
   }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

  toggleMenu(): void {
    this.menuOpened = !this.menuOpened;
    if (this.menuOpened) {
      this.contentMargin = 260;
    } else {
      this.contentMargin = 70;
    }
  }
}
