import { Component, OnInit } from '@angular/core';
import {GlobalService} from './service/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  checkIsUserStorage: boolean = false;
  constructor(private globalService: GlobalService){

  }

  ngOnInit() {
    this.globalService
      .checkUserStorage()
      .subscribe((value) => (this.checkIsUserStorage = value));
  }

  title = 'angular-social-network-login';
}
