import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginOrgComponent } from './login-org/login-org.component';
import { ListOrgComponent } from './list-org/list-org.component';
import { AddOrgComponent } from './add-org/add-org.component';
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    LoginOrgComponent,
    ListOrgComponent,
    AddOrgComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('auth_token');
        },
        //whitelistedDomains: ['http://122.170.12.63:90/'],
        //blacklistedRoutes: ['http://122.170.12.63:90/auth/login']
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
