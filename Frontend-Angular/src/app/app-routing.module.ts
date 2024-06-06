import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { ProvincesComponent } from './components/provinces/provinces.component';
import { AuthGuard } from './guards/auth.guard';
import { ProvinceDetailsComponent } from './components/province-details/province-details.component';
import { AdminPanelComponent } from './Pages/admin-panel/admin-panel.component';
import { UserPageComponent } from './Pages/user-page/user-page.component';
import { AddUserPageComponent } from './Pages/add-user-page/add-user-page.component';
import { DeleteUserComponent } from './Pages/delete-user/delete-user.component';
import { EditUserPageComponent } from './Pages/edit-user-page/edit-user-page.component';
import { CityDetailComponent } from './Pages/city-detail/city-detail.component';
import { UpdateCityComponent } from './Pages/update-city/update-city.component';
import { AddCityComponent } from './Pages/add-city/add-city.component';
import { DeleteCityComponent } from './Pages/delete-city/delete-city.component';
import { EditProvinceComponent } from './Pages/edit-province/edit-province.component';
import { DeleteProvinceComponent } from './Pages/delete-province/delete-province.component';
import { AddProvinceComponent } from './Pages/add-province/add-province.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full'},
  { path: 'addUser', component: AddUserPageComponent, canActivate: [AuthGuard]},
  { path: 'deleteUser', component: DeleteUserComponent, canActivate: [AuthGuard]},
  { path: 'editUser', component:EditUserPageComponent, canActivate: [AuthGuard]},
  { path: 'addCity', component: AddCityComponent, canActivate: [AuthGuard]},
  { path: 'deleteCity', component: DeleteCityComponent, canActivate: [AuthGuard]},
  { path: 'editCity', component:UpdateCityComponent, canActivate: [AuthGuard]},
  { path: 'addProvince', component: AddProvinceComponent, canActivate: [AuthGuard]},
  { path: 'deleteProvince', component: DeleteProvinceComponent, canActivate: [AuthGuard]},
  { path: 'editProvince', component:EditProvinceComponent, canActivate: [AuthGuard]},
  //{path: 'details', component: ProvinceDetailsComponent, canActivate: [AuthGuard]},
  {path: 'details/:id', component: ProvinceDetailsComponent, canActivate: [AuthGuard], children: 
  [
    { path: 'cityDetail', component: CityDetailComponent, canActivate: [AuthGuard]}
  ]},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], children:
  [
    { path: 'adminPanel', component: AdminPanelComponent, canActivate: [AuthGuard] },
    { path: 'userPage', component: UserPageComponent, canActivate: [AuthGuard], children:
    [
      {path: 'province', component: ProvincesComponent, canActivate: [AuthGuard]}
    ]}
  ]
},
  { path: '**', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
