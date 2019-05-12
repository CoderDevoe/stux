// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  recaptcha_site_key: '6LfiFKMUAAAAAM3eyMzv93HF2AobUFLY1xRTennK',
  recaptcha_secret_key: '6LfiFKMUAAAAANqdwoO-ME4FN0RQcvsqQfx6J7t7',
  firebase: {
    apiKey: 'AIzaSyCWbrBLw8UsxCRCXHceRzLZgEGnbFH-qMg',
    // authDomain: 'cloud-firestore-test.firebaseapp.com',
    databaseURL: 'https://stux-9dad2.firebaseio.com/',
    projectId: 'stux-9dad2',
    // storageBucket: 'cloud-firestore-test.appspot.com',
    // messagingSenderId: 'ZZZZZZZZZZZZ'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
