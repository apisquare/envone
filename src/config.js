const fs = require('fs');
const path = require('path');
const regex = new RegExp("(?<=\\{\\{).+?(?=\\}\\})", "g");
let isDebugEnabled = false;
let userEnvironmentKeys = [];

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
module.exports.retrieveProcessEnv = function () {
  return process.env;
};

function getProcessEnv() {
  return module.exports.retrieveProcessEnv();
}

/**
 * Match the given line with pre-defined regex
 * @param {*} line 
 */
module.exports.matcher = function (line) {
  return line.match(regex);
};

function getMatcher(line) {
  return module.exports.matcher(line);
}

/**
 * Replace the environment values using the configurations
 * @param {*} envValue 
 * @param {*} key 
 */
module.exports.configReplace = function (envValue, key) {
  if (!envValue || typeof envValue != "string") {
    return envValue;
  }

  try {
    const result = getMatcher(envValue);
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
};

function getConfigReplace(envValue, key) {
  return module.exports.configReplace(envValue, key);
}

/**
 * Pick the values for given environment, and replace the configurations
 * @param {*} config 
 */
function parseEnv(config) {
  try {
    userEnvironmentKeys = [];
    const nodeEnv = getProcessEnv()["ENV"] || getProcessEnv()["NODE_ENV"] || "DEV_1";
    Object.keys(config).forEach(function (key) {
      userEnvironmentKeys.push(key);
      if (typeof config[key] === 'object') {
        let nodeEnvValue = config[key][nodeEnv];
        if (!nodeEnvValue) {
          nodeEnvValue = config[key]["default"] || config[key]["DEFAULT"];
        }
        config[key] = nodeEnvValue;
      }

      const nodeValue = config[key];
      if (nodeValue && typeof nodeValue === 'string') {
        const replacedValue = getConfigReplace(nodeValue, key);
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
module.exports.config = function (options) {
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
};

/**
 * Retrieve environment keys which was set by user
 */
module.exports.getUserEnvironmentKeys = function () {
  return userEnvironmentKeys;
};
