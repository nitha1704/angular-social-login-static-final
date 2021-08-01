import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthService,
  SocialUser,
} from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userForm: any = FormGroup;
  isSubmitComplete: boolean = false;
  isTooltipsBoxShow: boolean = false;
  tooltipsBoxMsg: string = '';
  mainUrl: string = 'https://angular-social-login-static-final.netlify.app';
  targetUrl: string = 'https://twnz.dev/game/index.html';
  isUserStorage: boolean = false;

  currentTime: any = new Date().getTime();
  expiredTime: any = this.currentTime + (60 * 1000);

  constructor(private router: Router, private authService: SocialAuthService) {}

  ngOnInit(): void {
    // Form
    this.userForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });

    console.log('currentTime: ', this.currentTime);
    this.isTokenExpired();
  }

  // Method
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((data) => {
      localStorage.setItem('google_auth', JSON.stringify(data));

      const providerLowerCase = data.provider.toLowerCase();

      localStorage.setItem('userId', data.authToken);
      localStorage.setItem('userEmail', data.email);
      localStorage.setItem('authMode', providerLowerCase);
      localStorage.setItem('expired_in', this.expiredTime);
      this.redirectPage();
    });
  }

  signInWithFacebook(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then((data) => {
      localStorage.setItem('facebook_auth', JSON.stringify(data));

      const providerLowerCase = data.provider.toLowerCase();

      localStorage.setItem('userId', data.authToken);
      localStorage.setItem('userEmail', data.email);
      localStorage.setItem('authMode', providerLowerCase);
      localStorage.setItem('expired_in', this.expiredTime);
      this.redirectPage();
    });
  }

  handleSubmit(): void {
    if (this.userForm.status === 'INVALID') {
      this.userForm.markAllAsTouched();
      this.isTooltipsBoxShow = true;
      this.isSubmitComplete = false;
      this.tooltipsBoxMsg = 'Please fill your information.';
    } else if (this.userForm.status === 'VALID') {
      localStorage.setItem('userId', this.userForm.value.email);
      localStorage.setItem('userEmail', this.userForm.value.email);
      localStorage.setItem('authMode', 'anonymous');

      this.isTooltipsBoxShow = true;
      this.isSubmitComplete = true;
      this.tooltipsBoxMsg = 'Successfully login!';
      this.userForm.reset();
      this.redirectPage();
    }
  }

  handleSignOut(): void {
    localStorage.clear();
    this.authService.signOut();
    window.location.href = this.mainUrl;
  }

  isTokenExpired(): any {
    const getExpiredTime: any = localStorage.getItem('expired_in');
    if (this.currentTime > parseInt(getExpiredTime)) {
      localStorage.clear();
      this.authService.signOut();
    } else {
      // Local Storage
      const userIdStorage = localStorage.getItem('userId');
      if (userIdStorage) {
        this.isUserStorage = true;
        this.redirectPage();
      }
    }
  }

  redirectPage() {
    //window.location.href = this.targetUrl;
  }
}
