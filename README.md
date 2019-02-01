# metamobile

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

- Standard compliant React Native App Utilizing [Ignite](https://github.com/infinitered/ignite)

## :arrow_up: How to Setup

**Step 1:** git clone this repo:

**Step 2:** cd to the cloned repo:

**Step 3:** Install the Application with `yarn` or `npm i`

## :arrow_forward: How to Run App

1. cd to the repo
2. Run Build for either OS

- for iOS
  - run `react-native run-ios`
- for Android
  - Run Genymotion
  - run `react-native run-android`

## :no_entry_sign: Standard Compliant

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
This project adheres to Standard. Our CI enforces this, so we suggest you enable linting to keep your project compliant during development.

**To Lint on Commit**

This is implemented using [husky](https://github.com/typicode/husky). There is no additional setup needed.

**Bypass Lint**

If you have to bypass lint for a special commit that you will come back and clean (pushing something to a branch etc.) then you can bypass git hooks with adding `--no-verify` to your commit command.

**Understanding Linting Errors**

The linting rules are from JS Standard and React-Standard. [Regular JS errors can be found with descriptions here](http://eslint.org/docs/rules/), while [React errors and descriptions can be found here](https://github.com/yannickcr/eslint-plugin-react).

## :closed_lock_with_key: Secrets

This project uses [react-native-config](https://github.com/luggit/react-native-config) to expose config variables to your javascript code in React Native. You can store API keys
and other sensitive information in a `.env` file:

```
API_URL=https://myapi.com
GOOGLE_MAPS_API_KEY=abcdefgh
```

and access them from React Native like so:

```
import Secrets from 'react-native-config'

Secrets.API_URL  // 'https://myapi.com'
Secrets.GOOGLE_MAPS_API_KEY  // 'abcdefgh'
```

The `.env` file is ignored by git keeping those secrets out of your repo.

### Get started:

1. Copy .env.example to .env
2. Add your config variables
3. Done!

### Building the app

Android:

1. Get the keystore
2. Open project in android studio
3. Go to build.gradle of linked RN projects
4. Update `compileSdkVersion` to 27 and `buildToolsVersion` to 27.0.3
5. Run `cd android && ./gradlew assembleRelease`

### Adding API Endpoints

1. Open `Services/Api.js` and go to Step 2
2. Add a name for your endpoint
3. Create api call function (apisauce is derived from axios, so check axios docs for available apis)
4. Register endpoint call name in Step 3
5. Create appropriate redux actions in the `Redux` folder (e.g. `loginRequest` and `loginSuccess` for login)
6. To make api calls, add a new function in the relevant `Sagas.js` file (Auth sagas go in `AuthSagas.js`, etc)
7. Call the api endpoint function created in `Apis.js` and make sure to use the redux actions here to update the redux state
