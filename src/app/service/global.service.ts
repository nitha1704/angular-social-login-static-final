import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  isUserStorage = new BehaviorSubject(false);

  constructor() { }

  checkUserStorage() {
    return this.isUserStorage;
  }
}
