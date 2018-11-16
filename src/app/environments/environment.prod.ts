// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
    release: '3.0.1',
    production: true,
    name: 'prod',
    apiHost: '360medics.com',
    apiProtocol: 'https',
    apiToken: '4SJxKlCP9ucc6pzVXVv9zurURQ96Um7d',
    firebaseApiKey: 'AIzaSyBKiW91tUg_1WMJHHZs4o2uJ7dMNKoX8UA',
    firebaseAuthDomain: 'intouch-9b755.firebase.com',
    firebaseDatabaseURL: 'https://intouch-9b755.firebaseio.com',
    firebaseStorageBucket: 'intouch-9b755.appspot.com',
    firebaseMessagingSenderId: '67218027903',
    ravenClientDNS: 'https://86dfabf45ed3459789c9eaa15dce7f82@sentry.io/1217045', // leave blank to disable (in dev|local)
    mixpanelToken: '3339bf5cb2059376a820fafb8d7904ea',
    mixpanelSecret: 'b75f0bf7b95fad5c52f9100542ab922d',
};
