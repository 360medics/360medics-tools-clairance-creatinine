// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
    release: '3.0.1',
    production: false,
    name: 'dev',
    apiHost: '360medics.localhost',
    apiProtocol: 'http', // 'https'
    apiToken: 'yHTTi4o2hfdH9FzhUCsvyDzJKZsssZ6S',
    firebaseApiKey: 'AIzaSyBQHN_03mmtIAnTl2FEqEDdLlkLz9nx_yA',
    firebaseAuthDomain: 'intouch-test-9ba0b.firebaseapp.com',
    firebaseDatabaseURL: 'https://intouch-test-9ba0b.firebaseio.com',
    firebaseStorageBucket: 'intouch-test-9ba0b.appspot.com',
    firebaseMessagingSenderId: '795785700729',
    ravenClientDNS: null, // leave to "false" to disable (in dev|local)
    mixpanelToken: 'da6b24675562342ee90f37a0a67d0ae4',
    mixpanelSecret: 'ceb0810adefbf0d1540abced8bddec99',
};
