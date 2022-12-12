import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';
import { UserInfo } from '../models/userinfo';
import { PermissionService } from '../services/permission.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(private router: Router,
    private authenticationService: AuthenticationService,
    private permissionService: PermissionService) { }
    currentUser: User[];

    


  ngOnInit() {
   this.getCurrentUser();
  }
  
 
  private getCurrentUser(): User {
   return this.permissionService.getCurrentUser();
    
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn(); }
  
    
}
