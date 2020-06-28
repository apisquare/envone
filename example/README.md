# EnvOne- Test Node.js Server

## Run this server

This project has an example project configured with custom configurations. To run that project and see the outputs follow these steps,
1. Clone this repository : `git clone https://github.com/APISquare/envone`
2. Go inside the test-server folder : `cd envone/example`
3. Install the required dependencies : `npm install` or `yarn`
4. Start the server : `npm start` or `yarn start`
5. Go to [https://localhost:5000/status](https://localhost:5000/status) and see the console to get the loaded environment variables.

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