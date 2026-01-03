/**
 * Tool Registry
 * 
 * Registry of available audit tools and their configurations
 */

const logger = require('../logger');

/**
 * Available audit tools
 */
const TOOLS = {
  eslint: {
    name: 'ESLint',
    languages: ['javascript', 'typescript'],
    command: 'npx eslint',
    description: 'JavaScript/TypeScript linting',
    severity: ['error', 'warning']
  },
  prettier: {
    name: 'Prettier',
    languages: ['javascript', 'typescript', 'json', 'yaml', 'markdown', 'css', 'html'],
    command: 'npx prettier --check',
    description: 'Code formatting check',
    severity: ['warning']
  },
  shellcheck: {
    name: 'ShellCheck',
    languages: ['shell'],
    command: 'shellcheck',
    description: 'Shell script analysis',
    severity: ['error', 'warning', 'info']
  },
  bandit: {
    name: 'Bandit',
    languages: ['python'],
    command: 'bandit -r',
    description: 'Python security linting',
    severity: ['high', 'medium', 'low']
  },
  pylint: {
    name: 'Pylint',
    languages: ['python'],
    command: 'pylint',
    description: 'Python code analysis',
    severity: ['error', 'warning', 'convention']
  },
  semgrep: {
    name: 'Semgrep',
    languages: ['javascript', 'typescript', 'python', 'go', 'java', 'ruby', 'php', 'c', 'cpp'],
    command: 'semgrep',
    description: 'Pattern-based code analysis',
    severity: ['error', 'warning']
  },
  golangci_lint: {
    name: 'golangci-lint',
    languages: ['go'],
    command: 'golangci-lint run',
    description: 'Go linters aggregator',
    severity: ['error', 'warning']
  },
  clippy: {
    name: 'Clippy',
    languages: ['rust'],
    command: 'cargo clippy',
    description: 'Rust linting',
    severity: ['error', 'warning']
  },
  checkstyle: {
    name: 'Checkstyle',
    languages: ['java'],
    command: 'checkstyle',
    description: 'Java code style checker',
    severity: ['error', 'warning', 'info']
  },
  pmd: {
    name: 'PMD',
    languages: ['java'],
    command: 'pmd',
    description: 'Java source code analyzer',
    severity: ['critical', 'high', 'medium', 'low']
  }
};

/**
 * Get applicable tools for languages
 * @param {Array<string>} languages - Detected languages
 * @param {Object} config - Configuration
 * @returns {Array<Object>} List of applicable tools
 */
function getTools(languages, config) {
  const tools = [];

  for (const [key, tool] of Object.entries(TOOLS)) {
    // Check if tool is enabled in config
    if (config.audit.tools[key] && config.audit.tools[key].enabled) {
      // Check if tool supports any of the detected languages
      const hasLanguage = tool.languages.some(lang => languages.includes(lang));
      
      if (hasLanguage) {
        tools.push({
          ...tool,
          key,
          config: config.audit.tools[key]
        });
      }
    }
  }

  logger.debug(`Selected ${tools.length} tools for audit`);
  return tools;
}

/**
 * Register a custom tool
 * @param {string} key - Tool key
 * @param {Object} tool - Tool configuration
 */
function registerTool(key, tool) {
  TOOLS[key] = tool;
  logger.info(`Registered custom tool: ${tool.name}`);
}

/**
 * Get tool by key
 * @param {string} key - Tool key
 * @returns {Object|null} Tool configuration
 */
function getTool(key) {
  return TOOLS[key] || null;
}

/**
 * List all available tools
 * @returns {Object} All tools
 */
function listTools() {
  return { ...TOOLS };
}

module.exports = {
  getTools,
  registerTool,
  getTool,
  listTools,
  TOOLS
};
