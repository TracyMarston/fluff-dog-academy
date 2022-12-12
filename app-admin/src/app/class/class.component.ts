import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit {

  constructor( private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }
  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn(); }
}
