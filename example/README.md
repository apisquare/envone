# EnvOne- Test Node.js Server

## .env.config

```json
{
  "BFF_URL": "{{BASE_URL}}/api/v1",
  "SALESFORCE_URL":"https://{{ENV}}-salesforce.com/v1/test",
  "AWS_ACCESS_KEY": {
    "dev": "w5Dty3EaFi983etw",
    "stag": "u7Awda72Sd2Wfaf",
    "prod": "{{AWS_KEY}}"
  },
  "AWS_ACCESS_SECRET": {
    "dev": "w5Dty3EaFi983etw",
    "stag": "{{AWS_SECRET}}",
    "prod": "{{AWS_SECRET}}",
    "isSecret": true
  },
  "DB_CONNECTION_URL": "https://{{ENV}}-service-xyz-{{ENV}}.xyx.{{ENV}}-mongo.com",
  "DB_CONNECTION_PASSWORD": {
    "dev": "w5Dty3EaFi983etw",
    "stag": "{{DB_PASSWORD}}",
    "prod": "{{DB_PASSWORD}}",
    "isSecret": true
  },
  "ANALYTICS_URL": {
    "dev": "https://analytics.dev-services.com/",
    "stag": "https://analytics.stag-services.com/",
    "prod": "https://analytics.prod-services.com/"
  },
  "CONTACT_US_EMAIL": {
   "default": "hello-{{ENV}}@abcd.com",
   "prod": "hello@abcd.com"
  }
}
```

## Run this server

This project has an example project configured with custom configurations. To run that project and see the outputs follow these steps,
1. Clone this repository : `git clone https://github.com/apisquare/envone`
2. Go inside the test-server folder : `cd envone/example`
3. Install the required dependencies : `npm install` or `yarn`
4. Start the server : 
```bash
 # using npm
 ENV=DEV BASE_URL=https://xyz.test.abcd.com ANALYTICS_URL=https://analytics.services.com/ npm start
 # or using yarn
 ENV=DEV BASE_URL=https://xyz.test.abcd.com ANALYTICS_URL=https://analytics.services.com/ yarn start
```
5. Go to [https://localhost:5000/status](https://localhost:5000/status) and see the console to get the loaded environment variables.


## Use EnvOne with Dotenv

After step-3 in the above section,

4. Create `.env` file in your root directory with the following values,
```
 ENV=DEV
 BASE_URL=https://xyz.test.abcd.com
 ANALYTICS_URL=https://analytics.services.com/
```
5. Install `dotenv` to your project : `npm install dotenv` or `yarn add dotenv`
6. Configure `dotenv` before configuring `envone` in your root file.
```js
require('dotenv').config(); // to load .env values
require('envone').config(); // to configure other environment variables using loaded env values
# ...
```
7. Start the server : 
```bash
 # using npm
 npm start
 # or using yarn
 yarn start
```
8. Go to [https://localhost:5000/status](https://localhost:5000/status) and see the console to get the loaded environment variables.

## Runtime Environment Variables

```
[Env] ENV:  DEV
[Env] BASE_URL:  https://xyz.test.abcd.com
[Env] ANALYTICS_URL:  https://analytics.services.com/

[envone][DEBUG] Given "ANALYTICS_URL" is already pre-defined in "process.env" and can not be overwritten.

[Updated Env] BFF_URL:  https://xyz.test.abcd.com/api/v1
[Updated Env] SALESFORCE_URL:  https://DEV-salesforce.com/v1/test
[Updated Env] AWS_ACCESS_KEY:  w5Dty3EaFi983etw
[Updated Env] DB_CONNECTION_URL:  https://DEV-service-xyz-DEV.xyx.DEV-mongo.com
[Updated Env] ANALYTICS_URL:  https://analytics.services.com/
```
