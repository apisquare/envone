/* eslint-disable no-console */

const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

// Configure dotEnv to load required envs
require('dotenv').config();

console.log("[Env] ENV: ", process.env.ENV);
console.log("[Env] BASE_URL: ", process.env.BASE_URL);
console.log("[Env] ANALYTICS_URL: ", process.env.ANALYTICS_URL);

require('envone').config({ debug: true });

console.log("[Updated Env] BFF_URL: ", process.env.BFF_URL);
console.log("[Updated Env] SALESFORCE_URL: ", process.env.SALESFORCE_URL);
console.log("[Updated Env] AWS_ACCESS_KEY: ", process.env.AWS_ACCESS_KEY);
console.log("[Updated Env] DB_CONNECTION_URL: ", process.env.DB_CONNECTION_URL);
console.log("[Updated Env] ANALYTICS_URL: ", process.env.ANALYTICS_URL);

app.get('/hello', (req, res) =>
  res.send("Hello, Welcome to Express health test server"),
);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Express health test server listening on http://0.0.0.0:${port}`);
});
