// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseURL: "http://localhost:3000/",
  firebaseConfig : {
    apiKey: "AIzaSyBvl9VzLaXhTgQJ_4B_vK9HCxRRdgnsbT8",
    authDomain: "jaostore.firebaseapp.com",
    projectId: "jaostore",
    storageBucket: "jaostore.appspot.com",
    messagingSenderId: "449960766440",
    appId: "1:449960766440:web:fa0268674a40101d33125d",
    measurementId: "G-MTY8K023ZK"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
