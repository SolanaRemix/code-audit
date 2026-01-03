/**
 * Logger Utility
 * 
 * Provides structured logging for CodeAudit.sh
 */

const LOG_LEVELS = {
  ERROR: 0,
  WARN: 1,
  INFO: 2,
  DEBUG: 3
};

const currentLevel = LOG_LEVELS[process.env.LOG_LEVEL?.toUpperCase()] || LOG_LEVELS.INFO;

/**
 * Format log message with timestamp
 * @param {string} level - Log level
 * @param {string} message - Log message
 * @param {any} data - Additional data
 * @returns {string} Formatted log message
 */
function formatMessage(level, message, data) {
  const timestamp = new Date().toISOString();
  const dataStr = data ? ` ${JSON.stringify(data)}` : '';
  return `[${timestamp}] [${level}] ${message}${dataStr}`;
}

/**
 * Log error message
 * @param {string} message - Error message
 * @param {any} data - Additional data
 */
function error(message, data) {
  if (currentLevel >= LOG_LEVELS.ERROR) {
    console.error(formatMessage('ERROR', message, data));
  }
}

/**
 * Log warning message
 * @param {string} message - Warning message
 * @param {any} data - Additional data
 */
function warn(message, data) {
  if (currentLevel >= LOG_LEVELS.WARN) {
    console.warn(formatMessage('WARN', message, data));
  }
}

/**
 * Log info message
 * @param {string} message - Info message
 * @param {any} data - Additional data
 */
function info(message, data) {
  if (currentLevel >= LOG_LEVELS.INFO) {
    console.log(formatMessage('INFO', message, data));
  }
}

/**
 * Log debug message
 * @param {string} message - Debug message
 * @param {any} data - Additional data
 */
function debug(message, data) {
  if (currentLevel >= LOG_LEVELS.DEBUG) {
    console.log(formatMessage('DEBUG', message, data));
  }
}

module.exports = {
  error,
  warn,
  info,
  debug
};
