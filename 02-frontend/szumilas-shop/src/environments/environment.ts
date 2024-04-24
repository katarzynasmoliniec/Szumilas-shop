// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api',
  stripePublishableKey: "pk_test_51P3Zp4P2idyGRFSyWdSY91clcOjwljeIKIWvOam3atoqtbFRxu4ZjM5E9f10ORrZYJd9iV64PeIQO7onFioxUgTI00Br01PFEW",
  serverUrl: '/api',
  keycloak: {
    // Url of the Identity Provider
    issuer: 'http://localhost:8180/realms/szumilas-shop',
    // Realm
    realm: 'szumilas-shop',
    clientId: 'szumilas-shop',
    //redirect URI
    redirectURI: 'http://localhost:4200/products',
    //scope
    scope: 'openid profile email offline_access',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
