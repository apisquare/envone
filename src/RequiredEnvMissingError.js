
/**
 * Required Environment Keys missing Error
 */
class RequiredEnvMissingError extends Error {
  constructor(message, key) {
    super(message);
    this.isRequiredEnvMissingError = true; 
    this.key = key;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = RequiredEnvMissingError;
