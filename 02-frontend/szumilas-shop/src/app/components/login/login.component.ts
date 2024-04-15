import { Component, Inject, OnInit } from '@angular/core';
import { OKTA_AUTH, OktaAuthStateService } from '@okta/okta-angular';
import { OktaAuth, pkce } from '@okta/okta-auth-js';
import OktaSignIn from '@okta/okta-signin-widget';
import szumilasAppConfig from 'src/app/config/szumilas-app-config';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  oktaSignin: any;

  constructor(private oktaAuthService: OktaAuthStateService,
             @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) {

    this.oktaSignin = new OktaSignIn( {
      logo: 'assets/images/logo.png',
      baseUrl: szumilasAppConfig.oidc.issuer.split('/oauth2')[0],
      clientId: szumilasAppConfig.oidc.clientId,
      redirectUri: szumilasAppConfig.oidc.redirectUri,
      authParams: {
        pkce: true,
        issuer: szumilasAppConfig.oidc.issuer,
        scopes: szumilasAppConfig.oidc.scopes
      }
    });
   }

  ngOnInit(): void {

    this.oktaSignin.remove();
    this.oktaSignin.renderEl( {
      el: '#okta-sign-in-widget'}, // this name should be same as div tag id in login.component.html)
      (response: any) => {
        if(response.status === 'SUCCESS') {
          this.oktaAuth.signInWithRedirect();
        }
      },
      (error: any) => {
        throw error;
      }
    );
  }
}
