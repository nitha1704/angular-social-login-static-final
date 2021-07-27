import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocialLoginModule, GoogleLoginProvider, FacebookLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { GoogleDashboardComponent } from './components/google-dashboard/google-dashboard.component';
import { FacebookDashboardComponent } from './components/facebook-dashboard/facebook-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AboutComponent,
    ContactComponent,
    GoogleDashboardComponent,
    FacebookDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '820198266213-h3g87enp162vfdc7jaheiuksehdgk532.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('558848422221869'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
