import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';

import {AppComponent} from './app.component';
import {BrandsComponent} from './views/brands/brands.component';
import {WarehousesComponent} from './views/warehouses/warehouses.component';
import {UsersComponent} from './views/users/users.component';
import {DeliveriesComponent} from './views/deliveries/deliveries.component';
import {UniqueDeliveriesComponent} from './views/reports/uniqueDeliveries/uniqueDeliveries.component';
import {ProfileComponent} from './views/profile/profile.component';
import {ShopsComponent} from './views/shops/shops.component';

import {registerLocaleData} from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import {DELIVERIES_URL_TOKEN, DeliveryService} from './services/dao/impl/DeliveryService';
import {BRANDS_URL_TOKEN, BrandService} from './services/dao/impl/BrandService';
import {WAREHOUSES_URL_TOKEN, WarehouseService} from './services/dao/impl/WarehouseService';
import {SHOPS_URL_TOKEN, ShopService} from './services/dao/impl/ShopService';
import {USERS_URL_TOKEN, UserService} from './services/dao/impl/UserService';
import {ROLES_URL_TOKEN, RoleService} from './services/dao/impl/RoleService';
import {DELIVERY_TIMES_URL_TOKEN, DeliveryTimeService} from './services/dao/impl/DeliveryTimeService';
import {DELIVERY_TYPES_URL_TOKEN, DeliveryTypeService} from './services/dao/impl/DeliveryTypeService';
import {AuthService, LOGIN_URL_TOKEN, REGISTER_URL_TOKEN} from './security/auth.service';
import {EditUserDialogComponent} from './dialogs/edit-user-dialog/edit-user-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginComponent} from './views/login/login.component';
import {TokenInterceptor} from './security/token-interceptor';
import {AppRoutingModule} from './app-routing.module';
import {AuthGuard} from './security/auth.guard';
import {EditBrandDialogComponent} from './dialogs/edit-brand-dialog/edit-brand-dialog.component';
import {EditWarehouseDialogComponent} from './dialogs/edit-warehouse-dialog/edit-warehouse-dialog.component';
import {EditShopDialogComponent} from './dialogs/edit-shop-dialog/edit-shop-dialog.component';
import {EditDeliveryDialogComponent} from './dialogs/edit-delivery-dialog/edit-delivery-dialog.component';
import {MatConfirmDialogComponent} from './dialogs/mat-confirm-dialog/mat-confirm-dialog.component';
import {MatCardModule} from '@angular/material/card';
import {MatPasswordDialogComponent} from './dialogs/mat-password-dialog/mat-password-dialog.component';
import {AddDeliveriesComponent} from './views/add-deliveries/add-deliveries.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {MatColumnSelectDialogComponent} from './dialogs/mat-column-select-dialog/mat-column-select-dialog.component';

const BACKEND_ROOT_URL = 'https://command-project-warehouse.herokuapp.com/api/v1';
// const BACKEND_ROOT_URL = 'http://localhost:8189/api/v1';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    BrandsComponent,
    WarehousesComponent,
    UsersComponent,
    DeliveriesComponent,
    MatColumnSelectDialogComponent,
    UniqueDeliveriesComponent,
    ProfileComponent,
    ShopsComponent,
    EditUserDialogComponent,
    EditBrandDialogComponent,
    EditWarehouseDialogComponent,
    EditShopDialogComponent,
    EditDeliveryDialogComponent,
    MatConfirmDialogComponent,
    MatPasswordDialogComponent,
    LoginComponent,
    AddDeliveriesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatCardModule,
    NgxChartsModule
  ],
  providers: [ AuthService, AuthGuard, BrandService, DeliveryService,
    DeliveryTimeService, DeliveryTypeService, RoleService, ShopService,
    UserService, WarehouseService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: LOGIN_URL_TOKEN,
      useValue: BACKEND_ROOT_URL + '/auth'
    },
    {
      provide: REGISTER_URL_TOKEN,
      useValue: BACKEND_ROOT_URL + '/register'
    },
     {
      provide: DELIVERIES_URL_TOKEN,
      useValue: BACKEND_ROOT_URL + '/deliveries'
    },
    {
      provide: BRANDS_URL_TOKEN,
      useValue: BACKEND_ROOT_URL + '/brands'
    },
    {
      provide: WAREHOUSES_URL_TOKEN,
      useValue: BACKEND_ROOT_URL + '/warehouses'
    },
    {
      provide: SHOPS_URL_TOKEN,
      useValue: BACKEND_ROOT_URL + '/shops'
    },
    {
      provide: USERS_URL_TOKEN,
      useValue: BACKEND_ROOT_URL + '/users'
    },
    {
      provide: ROLES_URL_TOKEN,
      useValue: BACKEND_ROOT_URL + '/roles'
    },
    {
      provide: DELIVERY_TIMES_URL_TOKEN,
      useValue: BACKEND_ROOT_URL + '/delivery-times'
    },
    {
      provide: DELIVERY_TYPES_URL_TOKEN,
      useValue: BACKEND_ROOT_URL + '/delivery-types'
    },
  ],
  entryComponents: [
    EditUserDialogComponent,
    EditBrandDialogComponent,
    EditWarehouseDialogComponent,
    EditShopDialogComponent,
    EditDeliveryDialogComponent,
    MatConfirmDialogComponent,
    MatPasswordDialogComponent,
    MatColumnSelectDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
