import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersComponent} from './views/users/users.component';
import {BrandsComponent} from './views/brands/brands.component';
import {WarehousesComponent} from './views/warehouses/warehouses.component';
import {ShopsComponent} from './views/shops/shops.component';
import {DeliveriesComponent} from './views/deliveries/deliveries.component';
import {UniqueDeliveriesComponent} from './views/reports/uniqueDeliveries/uniqueDeliveries.component';
import {ProfileComponent} from './views/profile/profile.component';
import {AuthGuard} from './security/auth.guard';
import {LoginComponent} from './views/login/login.component';
import {AddDeliveriesComponent} from './views/add-deliveries/add-deliveries.component';

const routes: Routes = [
  {
    path: 'users', component: UsersComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN']
    }
  },
  {
    path: 'brands', component: BrandsComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN']
    }
  },
  {
    path: 'warehouses', component: WarehousesComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN']
    }
  },
  {
    path: 'shops', component: ShopsComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN']
    }
  },
  {
    path: 'deliveries', component: DeliveriesComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_WAREHOUSE', 'ROLE_BRAND_MANAGER']
    }
  },
  {
    path: 'add-deliveries', component: AddDeliveriesComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_BRAND_MANAGER']
    }
  },
  {
    path: 'reports', component: UniqueDeliveriesComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_WAREHOUSE', 'ROLE_BRAND_MANAGER']
    }
  },
  {
    path: 'profile', component: ProfileComponent,
    canActivate: [AuthGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_WAREHOUSE', 'ROLE_BRAND_MANAGER']
    }
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
