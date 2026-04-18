/**
 * Tool Registry
 * Registry of available static analysis tools for each language
 */

const logger = require('../logger');

// Tool registry by language
const TOOL_REGISTRY = {
  javascript: {
    eslint: {
      name: 'ESLint',
      command: 'eslint',
      description: 'Pluggable JavaScript linter',
      categories: ['quality', 'style', 'security']
    },
    jshint: {
      name: 'JSHint',
      command: 'jshint',
      description: 'JavaScript code quality tool',
      categories: ['quality', 'style']
    }
  },
  
  typescript: {
    tslint: {
      name: 'TSLint',
      command: 'tslint',
      description: 'Deprecated TypeScript linter (use ESLint with TypeScript support instead)',
      categories: ['quality', 'style'],
      deprecated: true,
      deprecationMessage: 'TSLint has been deprecated since 2019. Please use ESLint with TypeScript support instead.'
    },
    eslint: {
      name: 'ESLint (TypeScript)',
      command: 'eslint',
      description: 'JavaScript/TypeScript linter',
      categories: ['quality', 'style', 'security']
    }
  },
  
  python: {
    pylint: {
      name: 'Pylint',
      command: 'pylint',
      description: 'Python code analyzer',
      categories: ['quality', 'style']
    },
    flake8: {
      name: 'Flake8',
      command: 'flake8',
      description: 'Python style guide checker',
      categories: ['style']
    },
    bandit: {
      name: 'Bandit',
      command: 'bandit',
      description: 'Python security linter',
      categories: ['security']
    },
    mypy: {
      name: 'Mypy',
      command: 'mypy',
      description: 'Python static type checker',
      categories: ['quality']
    }
  },
  
  go: {
    golint: {
      name: 'Golint',
      command: 'golint',
      description: 'Go source code linter',
      categories: ['style']
    },
    gosec: {
      name: 'Gosec',
      command: 'gosec',
      description: 'Go security checker',
      categories: ['security']
    },
    staticcheck: {
      name: 'Staticcheck',
      command: 'staticcheck',
      description: 'Go static analysis tool',
      categories: ['quality', 'security']
    }
  },
  
  rust: {
    clippy: {
      name: 'Clippy',
      command: 'cargo clippy',
      description: 'Rust linter',
      categories: ['quality', 'style']
    }
  },
  
  java: {
    spotbugs: {
      name: 'SpotBugs',
      command: 'spotbugs',
      description: 'Static analysis tool for Java',
      categories: ['quality', 'security']
    },
    pmd: {
      name: 'PMD',
      command: 'pmd',
      description: 'Java source code analyzer',
      categories: ['quality', 'style']
    }
  },
  
  ruby: {
    rubocop: {
      name: 'RuboCop',
      command: 'rubocop',
      description: 'Ruby static code analyzer',
      categories: ['quality', 'style']
    },
    brakeman: {
      name: 'Brakeman',
      command: 'brakeman',
      description: 'Ruby on Rails security scanner',
      categories: ['security']
    }
  },
  
  php: {
    phpcs: {
      name: 'PHP_CodeSniffer',
      command: 'phpcs',
      description: 'PHP coding standard checker',
      categories: ['style']
    },
    psalm: {
      name: 'Psalm',
      command: 'psalm',
      description: 'PHP static analysis tool',
      categories: ['quality', 'security']
    }
  },
  
  csharp: {
    roslyn: {
      name: 'Roslyn Analyzers',
      command: 'dotnet build',
      description: 'C# code analyzer',
      categories: ['quality', 'style', 'security']
    }
  }
};

/**
 * Get available tools for a language
 * @param {string} language - Programming language
 * @returns {Array<string>} Array of tool names
 */
function getToolsForLanguage(language) {
  const tools = TOOL_REGISTRY[language];
  
  if (!tools) {
    logger.debug(`No tools registered for language: ${language}`);
    return [];
  }
  
  return Object.keys(tools);
}

/**
 * Get tool configuration
 * @param {string} language - Programming language
 * @param {string} toolName - Tool name
 * @returns {Object|null} Tool configuration or null
 */
function getToolConfig(language, toolName) {
  const tools = TOOL_REGISTRY[language];
  
  if (!tools || !tools[toolName]) {
    logger.debug(`Tool ${toolName} not found for language ${language}`);
    return null;
  }
  
  return tools[toolName];
}

/**
 * Get all tools by category
 * @param {string} category - Category name (quality, style, security)
 * @returns {Array<Object>} Array of tools matching the category
 */
function getToolsByCategory(category) {
  const matchingTools = [];
  
  Object.entries(TOOL_REGISTRY).forEach(([language, tools]) => {
    Object.entries(tools).forEach(([toolName, toolConfig]) => {
      if (toolConfig.categories.includes(category)) {
        matchingTools.push({
          language,
          name: toolName,
          ...toolConfig
        });
      }
    });
  });
  
  return matchingTools;
}

/**
 * Check if a tool is available for a language
 * @param {string} language - Programming language
 * @param {string} toolName - Tool name
 * @returns {boolean} True if tool is available
 */
function isToolAvailable(language, toolName) {
  const tools = TOOL_REGISTRY[language];
  return tools && tools[toolName] !== undefined;
}

module.exports = {
  getToolsForLanguage,
  getToolConfig,
  getToolsByCategory,
  isToolAvailable,
  TOOL_REGISTRY
};
