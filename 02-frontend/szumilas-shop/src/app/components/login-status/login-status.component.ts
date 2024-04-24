import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  userFullName: string = '';

  constructor(private authService: AuthService){ }

  ngOnInit(): void {
    this.configureSSO();

    // subscribe to autentication state change
    this.authService.userFullName.subscribe(
      data => this.userFullName = data
    );
  }

  configureSSO() {
    this.authService.configureSSO();
  }

  login(){
    this.authService.login();
  }

  logout(){
    this.authService.logout();
  }

  public get token() {
    return this.authService.token;
  }
}
