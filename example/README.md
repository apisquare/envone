# EnvOne- Test Node.js Server

## Run this server

This project has an example project configured with custom configurations. To run that project and see the outputs follow these steps,
1. Clone this repository : `git clone https://github.com/APISquare/envone`
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

## Loaded Environment Variables

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
