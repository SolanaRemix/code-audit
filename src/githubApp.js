/**
 * GitHub App Integration
 * 
 * Sets up GitHub App webhooks and authentication
 */

const logger = require('./logger');

/**
 * Setup GitHub App integration
 * @param {Object} app - Probot app instance
 */
function setupGitHubApp(app) {
  logger.info('Setting up GitHub App integration');

  // Register additional event handlers if needed
  app.on('installation.created', async (context) => {
    logger.info(`App installed on: ${context.payload.installation.account.login}`);
  });

  app.on('installation.deleted', async (context) => {
    logger.info(`App uninstalled from: ${context.payload.installation.account.login}`);
  });

  // Health check endpoint
  if (app.route) {
    app.route().get('/health', (req, res) => {
      res.status(200).json({
        status: 'healthy',
        version: require('../package.json').version,
        timestamp: new Date().toISOString()
      });
    });
  }

  logger.info('GitHub App integration setup complete');
}

/**
 * Get authenticated Octokit client for installation
 * @param {Object} context - Probot context
 * @returns {Object} Octokit client
 */
function getOctokit(context) {
  return context.octokit;
}

module.exports = {
  setupGitHubApp,
  getOctokit
};
