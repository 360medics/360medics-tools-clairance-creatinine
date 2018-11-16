// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
export const environment = {
    release: '3.0.1',
    production: true,
    name: 'staging',
    apiHost: 'beta.360medics.com',
    apiProtocol: 'https',
    apiToken: '2uJxKlCP9ucc6pzVXVv9zurURQ96Um7d',
    firebaseApiKey: 'AIzaSyDDu4Dygu7T8j82s3wvHVFS5b-xOyJHwLo',
    firebaseAuthDomain: 'intouch-staging.firebase.com',
    firebaseDatabaseURL: 'https://intouch-staging.firebaseio.com',
    firebaseStorageBucket: 'intouch-staging.appspot.com',
    firebaseMessagingSenderId: '820583192589',
    ravenClientDNS: 'https://86dfabf45ed3459789c9eaa15dce7f82@sentry.io/1217045', // leave blank to disable (in dev|local)
    mixpanelToken: '762d232945fac32392d7e1b31e1a7328',
    mixpanelSecret: 'ded95d48f6856e60a9f94a17fdd78b36',
};
