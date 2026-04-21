/**
 * Configuration loader for CodeAudit.sh
 * Loads and validates .codeaudit.yml configuration from repositories
 */

const yaml = require('js-yaml');
const logger = require('./logger');

// Default configuration
const DEFAULT_CONFIG = {
  enabled: true,
  analyzers: {
    security: {
      enabled: true,
      severity: 'error'
    },
    quality: {
      enabled: true,
      severity: 'warning'
    },
    style: {
      enabled: false,
      severity: 'info'
    },
    complexity: {
      enabled: true,
      max_complexity: 10,
      severity: 'warning'
    }
  },
  languages: {
    javascript: {
      enabled: true,
      tools: ['eslint']
    },
    python: {
      enabled: true,
      tools: ['pylint', 'bandit']
    },
    go: {
      enabled: true,
      tools: ['staticcheck', 'gosec']
    }
  },
  thresholds: {
    error: 0,
    warning: 10,
    info: -1
  },
  exclude: [
    'node_modules/**',
    'vendor/**',
    'dist/**',
    'build/**',
    '.git/**',
    '*.min.js',
    '*.min.css',
    'coverage/**'
  ],
  comments: {
    enabled: true,
    style: 'summary',
    min_severity: 'warning',
    update_existing: true
  },
  reporting: {
    detailed: true,
    include_snippets: true,
    max_issues: 50
  },
  performance: {
    timeout: 300,
    max_file_size: 1048576, // 1MB
    parallel: true,
    max_workers: 4
  }
};

/**
 * Load configuration from repository
 * @param {Object} context - Probot context
 * @returns {Promise<Object>} Configuration object
 */
async function loadConfig(context) {
  logger.debug('Loading configuration from repository');
  
  try {
    // Try to load .codeaudit.yml from repository
    const configFile = await context.octokit.repos.getContent({
      owner: context.payload.repository.owner.login,
      repo: context.payload.repository.name,
      path: '.codeaudit.yml'
    }).catch(() => null);

    if (configFile && configFile.data) {
      const content = Buffer.from(configFile.data.content, 'base64').toString('utf8');
      const userConfig = yaml.load(content);
      
      logger.debug('User configuration loaded', { config: userConfig });
      
      // Merge with default config
      const config = mergeConfig(DEFAULT_CONFIG, userConfig);
      
      // Validate configuration
      validateConfig(config);
      
      return config;
    }
  } catch (error) {
    logger.warn('Error loading configuration file, using defaults', { error: error.message });
  }

  logger.debug('Using default configuration');
  return { ...DEFAULT_CONFIG };
}

/**
 * Deep merge two objects
 * @param {Object} target - Target object
 * @param {Object} source - Source object
 * @returns {Object} Merged object
 */
function deepMerge(target, source) {
  const result = { ...target };
  
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  
  return result;
}

/**
 * Merge user configuration with defaults
 * @param {Object} defaultConfig - Default configuration
 * @param {Object} userConfig - User configuration
 * @returns {Object} Merged configuration
 */
function mergeConfig(defaultConfig, userConfig) {
  return deepMerge(defaultConfig, userConfig);
}

/**
 * Validate configuration
 * @param {Object} config - Configuration to validate
 * @throws {Error} If configuration is invalid
 */
function validateConfig(config) {
  if (typeof config.enabled !== 'boolean') {
    throw new Error('config.enabled must be a boolean');
  }

  if (config.thresholds) {
    const { error, warning, info } = config.thresholds;
    if (error < -1 || warning < -1 || info < -1) {
      throw new Error('Threshold values must be -1 or greater');
    }
  }

  if (config.performance) {
    if (config.performance.timeout && config.performance.timeout < 1) {
      throw new Error('Performance timeout must be greater than 0');
    }
    if (config.performance.max_workers && config.performance.max_workers < 1) {
      throw new Error('Max workers must be greater than 0');
    }
  }

  logger.debug('Configuration validated successfully');
}

module.exports = {
  loadConfig,
  DEFAULT_CONFIG
};
