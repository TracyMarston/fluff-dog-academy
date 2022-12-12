import { Inject, Injectable } from '@angular/core';
import { BROWSER_STORAGE } from '../storage';
import { User } from '../models/user';
import { AuthenticationService } from './authentication.service';



@Injectable({
  providedIn: 'root'
})

export class PermissionService {

    constructor(
        @Inject(BROWSER_STORAGE) private storage: Storage,
        private authenticationService: AuthenticationService
      ) { }
     
      public getCurrentUser(): User {
        if (this.authenticationService.isLoggedIn()) {
          const TEST: string = this.authenticationService.getToken();
          console.log("TOKEN FOUND: " + TEST);
          const { email, name } = JSON.parse(atob(TEST.split('.')[1]));
          
          return { email, name } as User;
        }
      }


    }