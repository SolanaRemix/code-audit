/**
 * Configuration Loader
 * 
 * Loads and validates CodeAudit.sh configuration from repository
 */

const yaml = require('js-yaml');
const logger = require('./logger');

/**
 * Default configuration
 */
const DEFAULT_CONFIG = {
  enabled: true,
  addLabels: true,
  audit: {
    events: ['pull_request.opened', 'pull_request.synchronize'],
    languages: ['javascript', 'typescript', 'python', 'go', 'rust', 'java'],
    tools: {
      eslint: { enabled: true },
      prettier: { enabled: true },
      shellcheck: { enabled: true },
      bandit: { enabled: true },
      semgrep: { enabled: true }
    },
    thresholds: {
      critical: 0,
      high: 5,
      medium: 10,
      low: 20
    },
    exclude: [
      'node_modules/',
      'dist/',
      'build/',
      'vendor/',
      '*.min.js',
      '*.test.js'
    ]
  },
  comment: {
    enabled: true,
    updateExisting: true,
    includeFullReport: true,
    collapseDetails: true
  },
  labels: {
    critical: 'audit: critical',
    high: 'audit: high',
    medium: 'audit: medium',
    low: 'audit: low',
    passed: 'audit: passed',
    failed: 'audit: failed'
  },
  integrations: {
    slack: { enabled: false },
    actions: { enabled: true, failOnCritical: true }
  }
};

/**
 * Load configuration from repository
 * @param {Object} context - Probot context
 * @returns {Promise<Object>} Configuration object
 */
async function loadConfig(context) {
  try {
    // Try to load .codeaudit.yml from repository
    const configFile = await context.octokit.repos.getContent({
      owner: context.payload.repository.owner.login,
      repo: context.payload.repository.name,
      path: '.codeaudit.yml',
      ref: context.payload.pull_request.head.sha
    }).catch(() => null);

    if (!configFile || !configFile.data) {
      logger.info('No .codeaudit.yml found, using default configuration');
      return DEFAULT_CONFIG;
    }

    // Decode and parse YAML
    const content = Buffer.from(configFile.data.content, 'base64').toString('utf8');
    const userConfig = yaml.load(content);

    // Merge with defaults
    const config = mergeConfig(DEFAULT_CONFIG, userConfig);
    
    logger.info('Configuration loaded successfully');
    return config;
  } catch (error) {
    logger.error('Error loading configuration:', error);
    return DEFAULT_CONFIG;
  }
}

/**
 * Deep merge configuration objects
 * @param {Object} defaults - Default configuration
 * @param {Object} user - User configuration
 * @returns {Object} Merged configuration
 */
function mergeConfig(defaults, user) {
  const result = { ...defaults };
  
  for (const key in user) {
    if (user[key] && typeof user[key] === 'object' && !Array.isArray(user[key])) {
      result[key] = mergeConfig(defaults[key] || {}, user[key]);
    } else {
      result[key] = user[key];
    }
  }
  
  return result;
}

/**
 * Validate configuration
 * @param {Object} config - Configuration to validate
 * @returns {boolean} True if valid
 */
function validateConfig(config) {
  if (typeof config.enabled !== 'boolean') {
    logger.warn('Invalid config: enabled must be boolean');
    return false;
  }
  
  if (config.audit && config.audit.thresholds) {
    const thresholds = config.audit.thresholds;
    if (typeof thresholds.critical !== 'number' ||
        typeof thresholds.high !== 'number' ||
        typeof thresholds.medium !== 'number' ||
        typeof thresholds.low !== 'number') {
      logger.warn('Invalid config: thresholds must be numbers');
      return false;
    }
  }
  
  return true;
}

module.exports = {
  loadConfig,
  validateConfig,
  DEFAULT_CONFIG
};
