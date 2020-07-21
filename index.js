const envOneConfig = require('./src/config');

module.exports.config = envOneConfig.config; 
module.exports.getUserEnvironmentKeys = envOneConfig.getUserEnvironmentKeys;

// TODO: this also should return the function getUserEnvironmentKeys, Like this
// const envOne =require('envOne').config()
// envOne.getUserEnvironmentKeys()
