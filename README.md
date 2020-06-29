# EnvOne

<img src="https://raw.githubusercontent.com/APISquare/envone/master/envone.png" alt="dotenv" align="right" />

<b>EnvOne</b> is a zero-dependency module that loads dynamic environment configurations from a `.env.config` file, and process it as environment variables into `process.env` - <b>Reduce your environment variables!</b>

![Node.js CI Build](https://github.com/APISquare/envone/workflows/Node.js%20CI%20Build/badge.svg)
[![NPM version](https://img.shields.io/npm/v/envone.svg)](https://www.npmjs.com/package/envone)
[![codecov](https://codecov.io/gh/APISquare/envone/branch/master/graph/badge.svg)](https://codecov.io/gh/APISquare/envone)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/envone)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=APISquare_envone&metric=alert_status)](https://sonarcloud.io/dashboard?id=APISquare_envone)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FAPISquare%2Fenvone.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2FAPISquare%2Fenvone?ref=badge_shield)

## Install

```bash
# install with npm
npm install envone

# or install with Yarn
yarn add envone
```

## Why EnvOne?

- Do you worry about non-secret environment variables across your environments?
  ```
   CONTACT_US_EMAIL (DEV): hello-dev@abcd.com
   CONTACT_US_EMAIL (STAG): hello-stag@abcd.com
   CONTACT_US_EMAIL (PROD): hello@abcd.com
  ```
- Are you suffering to manage a lot of environment variables across your environments?
- Do you follow any unique patterns across your environments?
  ```
  DEV: https://test-dev.application.abcd.com
  STAG: https://test-stag.application.abcd.com
  PROD: https://test-prod.application.abcd.com
  ```
- You can commit this to your source control to reduce your management of non-secret environment variables.

## Usage

As early as possible in your application, require and configure <b>envone</b>.

```javascript
require('envone').config()
```

Create a `.env.config` file in the root directory of your project. Add environment-specific configurations as JSON format. For example:

 ```json
 {
  "SERVER_URL": "https://test-{{ENV}}.application.abcd.com",
  "CONTACT_US_EMAIL": {
    "DEV": "hello-dev@abcd.com",
    "STAG": "hello-stag@abcd.com",
    "PROD": "hello@abcd.com"
  },
 }
 ```
Now, create your `.env` file only with `ENV=DEV` or pass it when you start your application..!
```bash
ENV=DEV node index.js
```

Now, `process.env` has the keys and values you defined in your `.env.config` file. Here, `process.env.CONTACT_US_EMAIL` will have the value for `DEV` key as the application is started with `ENV=DEV`.

```js
function request(serverUrl) {
  // send backed request
  // serverUrl = https://test-DEV.application.abcd.com
}
const res = request(process.env.BFF_URL)

function setContactUseEmail(emailAddress) { 
  // send email
  // emailAddress = hello-dev@abcd.com
 }
const emailRes = request(process.env.CONTACT_US_EMAIL)
```

#### Example : [EnvOne- Test Node.js Server](https://github.com/APISquare/envone/tree/master/example)

## .env.config - Rules

Dynamic environment configurations will be loaded from `.env.config` file, and will be replaced based on given environment variables. 

1. `.env.config` should be a JSON configurations (key and values pairs)
2. Value for each key can be string or object based on the application environment.
   - `key: string value` : Value should be plain string, and dynamic part should be wrapped with `{{` and `}}`. For example, If you dynamically change the `base_url` in your `server_url` (You should pass the `base_url` when you start your application as environment variable.), 
   ```json
    { "server_url": "{{base_url}}/api/v1" }
   ```
   - `key: object` : Value should be JSON object, and each keys should be based on environments(e.g: `DEV`, `STAG`, `PROD`). This environment-key will be picked from the environment variables such as `ENV` or `NODE_ENV`.
   ```json
    { "ACCESS_KEY": {
        "DEV": "w5Dty3EaFi983ew",
        "STAG": "u7Awda72Sd2Wfaf",
        "PROD": "p9AfawaCa23AwrG"
      }
    }
   ```
3. Use the `DEFAULT` to defined your environment variables that have the same patterns across the environments. For example,
    ```
    CONTACT_US_EMAIL (DEV): hello-dev@abcd.com
    CONTACT_US_EMAIL (STAG): hello-stag@abcd.com
    CONTACT_US_EMAIL (PROD): hello@abcd.com
    ```
    Here, `DEV` and `STAG` environment variables have the same pattern, and `PROD` differed from that pattern. So you can simply define,
    ```json
    { "CONTACT_US_EMAIL": {
        "DEFAULT": "hello-{{ENV}}@abcd.com",
        "PROD": "hello@abcd.com"
      }
    }
    ```
4. Here, you have the flexible to override any environment variables through the direct environment variables. You can simply pass that variable during the application startup to override any values. For example:
    ```json
    {
      "SERVER_URL": "{{BASE_URL}}/api/v1",
      "ACCESS_KEY": {
        "DEV": "w5Dty3EaFi983ew",
        "STAG": "u7Awda72Sd2Wfaf",
        "PROD": "p9AfawaCa23AwrG"
      },
    }
    ```
    You can use the following command to start the applications,
    ```bash
    SERVER_URL=https://test.abc.com/rest ACCESS_KEY=pWs13dSwerF node index.js
    ```
    Here, the configuration in `.env.config` will be ignored, and `SERVER_URL` and `ACCESS_KEY` will be picked from the startup environment variables.

  
### Options

#### Path

Default: `path.resolve(process.cwd(), '.env.config')`

You can specify a custom path of `.env.config`, if that file is located elsewhere from default root path.

```js
require('envone').config({ path: '/custom-path/.env.config' })
```

#### Debug

Default: `false`

You can turn on logging to help debug the environment related issues (why certain keys or values are not being set as you expect)

```js
require('envone').config({ debug: true })
```

## Contributions

You can add any suggestions/feature requirements/bugs to the Github issues page : [https://github.com/APISquare/envone/issues](https://github.com/APISquare/envone/issues)

Add your fixes and development changes as pull requests to this [repository](https://github.com/APISquare/envone/pulls).


## License

[MIT License](https://opensource.org/licenses/MIT)

[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2FAPISquare%2Fenvone.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2FAPISquare%2Fenvone?ref=badge_large)