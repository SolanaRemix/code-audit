/**
 * Analyzer Registry
 * Central registry for all available code analyzers
 */

const logger = require('../logger');
const { getToolsForLanguage } = require('./toolRegistry');

/**
 * Get analyzers for the detected languages and configuration
 * @param {Array<string>} languages - Detected languages
 * @param {Object} config - Configuration object
 * @returns {Array<Object>} Array of analyzer configurations
 */
function getAnalyzers(languages, config) {
  const analyzers = [];

  languages.forEach(language => {
    const langConfig = config.languages[language];
    
    if (!langConfig || !langConfig.enabled) {
      logger.debug(`Language ${language} is not enabled in configuration`);
      return;
    }

    const tools = langConfig.tools || getToolsForLanguage(language);
    
    tools.forEach(tool => {
      analyzers.push({
        language,
        tool,
        config: langConfig
      });
    });
  });

  logger.debug(`Registered ${analyzers.length} analyzers`, { analyzers });
  return analyzers;
}

/**
 * Get analyzer by name
 * @param {string} name - Analyzer name
 * @returns {Object|null} Analyzer configuration or null
 */
function getAnalyzerByName(name) {
  // In a real implementation, this would return specific analyzer configurations
  logger.debug(`Looking up analyzer: ${name}`);
  return null;
}

module.exports = {
  getAnalyzers,
  getAnalyzerByName
};
