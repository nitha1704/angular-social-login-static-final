import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from 'angularx-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facebook-dashboard',
  templateUrl: './facebook-dashboard.component.html',
  styleUrls: ['./facebook-dashboard.component.css'],
})
export class FacebookDashboardComponent implements OnInit {
  userDetails = {
    id: '',
    photoUrl: '',
    name: '',
    email: '',
    provider: '',
    idToken: '',
    authToken: '',
  };

  constructor(private router: Router, private authService: SocialAuthService) {}

  ngOnInit(): void {
    const facebookStorage = localStorage.getItem('facebook_auth');
    if (facebookStorage) {
      this.userDetails = JSON.parse(facebookStorage);
      console.log(this.userDetails);
    } else {
      this.signOut();
    }
  }

  signOut(): void {
    this.authService.signOut();
    localStorage.removeItem('facebook_auth');
    localStorage.removeItem('user_id_facebook');
    this.router.navigateByUrl('/login').then();
  }
}

