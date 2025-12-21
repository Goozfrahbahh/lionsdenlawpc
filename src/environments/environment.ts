// export const environment = {
//   useEmulators: true,
//   production: false,
//   firebase: {
//     projectId: 'casa-colombia-inventory-pro',
//     appId: '1:44676347390:web:72650263acec4b12abfcaf',
//     databaseURL: 'https://casa-colombia-inventory-pro-default-rtdb.firebaseio.com',
//     storageBucket: 'casa-colombia-inventory-pro.appspot.com',
//     locationId: 'us-central',
//     apiKey: 'AIzaSyBbUucW9tbDnoAIdCroyR4m24Vugeqmhsw',
//     authDomain: 'casa-colombia-inventory-pro.firebaseapp.com',
//     messagingSenderId: '44676347390',
//     measurementId: 'G-DY8SMJFFZT',
//   },
// };
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  supabaseKey:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hdmdkYmVjdG1rdHhjeWJuc3d5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAwNjAyMDAsImV4cCI6MjA1NTYzNjIwMH0.LcEqYg_QHtn2N7yoWYr6pvIDq7Ps_RIS133R7QQHDmw',
  supabaseUrl: 'https://oavgdbectmktxcybnswy.supabase.co',
  mondayApiToken:
    'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjQxMTIxNDY5MCwiYWFpIjoxMSwidWlkIjo1NTkwNjk2OSwiaWFkIjoiMjAyNC0wOS0xNlQxMzo1NzoyNS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTUyNjU3NzgsInJnbiI6InVzZTEifQ.BUmrCbwL5tmk_g3v5ETMR5jHHMhqhYdBAJikA54fOio', // Replace with your API token
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
 import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
