import { CUSTOM_ELEMENTS_SCHEMA ,NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { ProvincesComponent } from './components/provinces/provinces.component';
import { ProvinceDetailsComponent } from './components/province-details/province-details.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { UserPageComponent } from './Pages/user-page/user-page.component';
import { AdminPanelComponent } from './Pages/admin-panel/admin-panel.component';
import { AddUserPageComponent } from './Pages/add-user-page/add-user-page.component';
import { DeleteUserComponent } from './Pages/delete-user/delete-user.component';
import { EditUserPageComponent } from './Pages/edit-user-page/edit-user-page.component';
import { JWT_OPTIONS, JwtHelperService } from '@auth0/angular-jwt';
import { CityDetailComponent } from './Pages/city-detail/city-detail.component';
import { AddCityComponent } from './Pages/add-city/add-city.component';
import { DeleteCityComponent } from './Pages/delete-city/delete-city.component';
import { UpdateCityComponent } from './Pages/update-city/update-city.component';

//swiper
import { register } from 'swiper/element/bundle';
import { AddProvinceComponent } from './Pages/add-province/add-province.component';
import { DeleteProvinceComponent } from './Pages/delete-province/delete-province.component';
import { EditProvinceComponent } from './Pages/edit-province/edit-province.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
register();

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ProvincesComponent,
    ProvinceDetailsComponent,
    UserPageComponent,
    AdminPanelComponent,
    AddUserPageComponent,
    DeleteUserComponent,
    EditUserPageComponent,
    CityDetailComponent,
    AddCityComponent,
    DeleteCityComponent,
    UpdateCityComponent,
    AddProvinceComponent,
    DeleteProvinceComponent,
    EditProvinceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FontAwesomeModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true 
    },
    {
      provide: JWT_OPTIONS, useValue: JWT_OPTIONS
    },JwtHelperService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
