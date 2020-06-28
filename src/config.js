const fs = require('fs');
const path = require('path');
const regex = new RegExp("(?<=\\{\\{).+?(?=\\}\\})", "g");
let isDebugEnabled = false;

/**
 * Log messages in console
 * @param {*} message 
 */
function logger (message) {
  if (isDebugEnabled) {
    // eslint-disable-next-line no-console
    console.log(`[envone][DEBUG] ${message}`);
  }
}

/**
 * Retrieve existing process environments, will be used to mock the process envs
 */
function retrieveProcessEnv() {
  return process.env;
}

/**
 * Get existing process environments
 */
function getProcessEnv() {
  return module.exports.retrieveProcessEnv();
}

/**
 * Match the given line with pre-defined regex
 * @param {*} line 
 */
function matcher(line) {
  try {
    return line.match(regex);
  } catch (error) {
    logger(`Error : ${error}`);
    return { error };
  }
}

/**
 * Replace the environment values using the configurations
 * @param {*} envValue 
 * @param {*} key 
 */
function configReplace (envValue, key) {
  if (!envValue || typeof envValue != "string") {
    return envValue;
  }

  try {
    const result = matcher(envValue);
    if (result) {
      result.forEach(node => {
        let processEnv = getProcessEnv()[node];
        if (!processEnv) {
          logger(`Can't find environment value for "${node}". Invalid configuration found for "${key}".`);
        }
        envValue = envValue.replace("{{" + node + "}}", processEnv);
      });
    }
    return envValue;
  } catch (error) {
    logger(`Error : ${error}`);
    return { error };
  }
}

/**
 * Pick the values for given environment, and replace the configurations
 * @param {*} config 
 */
function parseEnv(config) {
  try {
    const nodeEnv = getProcessEnv()["ENV"] || getProcessEnv()["NODE_ENV"] || "DEV_1";
    Object.keys(config).forEach(function (key) {
      if (typeof config[key] === 'object') {
        const nodeEnvValue = config[key][nodeEnv];
        config[key] = nodeEnvValue;
      }

      const nodeValue = config[key];
      if (nodeValue && typeof nodeValue === 'string') {
        const replacedValue = configReplace(nodeValue, key);
        config[key] = replacedValue;

        if (!Object.prototype.hasOwnProperty.call(getProcessEnv(), key)) {
          getProcessEnv()[key] = replacedValue;
        } else {
          logger(`Given "${key}" is already pre-defined in "process.env" and can not be overwritten.`);
        }

      } else {
        logger(`Can't find a valid environment value of "${key}" for ${nodeEnv} environment.`);
      }
    });
    return config;
  } catch (error) {
    logger(`Error : ${error}`);
    return { error };
  }
}

/**
 * Configure the environment variables
 */
function config (options) {
  let configPath = path.resolve(process.cwd(), '.env.config');
  isDebugEnabled = false;
  if (options) {
    if (options.path) {
      configPath = options.path;
    }
    if (options.debug) {
      isDebugEnabled = true;
    }
  }

  try {
    const parsedData = parseEnv(JSON.parse(fs.readFileSync(configPath, { encoding: "utf8" })));

    return parsedData || {};
  } catch (error) {
    logger(`Error : ${error}`);
    return { error };
  }
}

module.exports.config = config;
module.exports.retrieveProcessEnv = retrieveProcessEnv;