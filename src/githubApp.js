/**
 * GitHub App setup and utilities
 * Handles GitHub App initialization and common operations
 */

const logger = require('./logger');

/**
 * Set up GitHub App with necessary event handlers and configurations
 * @param {import('probot').Probot} app - Probot instance
 */
function setupGitHubApp(app) {
  logger.info('Setting up GitHub App handlers');

  // Log when app receives any webhook
  app.on('*', (context) => {
    logger.debug(`Received webhook: ${context.name}.${context.payload.action || 'triggered'}`);
  });

  // Handle installation events
  app.on('installation.created', async (context) => {
    logger.info(`App installed by ${context.payload.sender.login} on ${context.payload.installation.account.login}`);
  });

  app.on('installation.deleted', async (context) => {
    logger.info(`App uninstalled from ${context.payload.installation.account.login}`);
  });

  // Handle errors globally
  app.onError((error) => {
    logger.error('Global error handler caught an error:', error);
  });
}

/**
 * Check if a file matches exclude patterns
 * @param {string} filePath - File path to check
 * @param {Array<string>} excludePatterns - Array of glob patterns to exclude
 * @returns {boolean} True if file should be excluded
 */
function shouldExcludeFile(filePath, excludePatterns) {
  if (!excludePatterns || excludePatterns.length === 0) {
    return false;
  }

  // Simple pattern matching (in production, use a proper glob library)
  return excludePatterns.some(pattern => {
    // Convert glob pattern to regex
    const regex = new RegExp(
      pattern
        .replace(/\./g, '\\.')
        .replace(/\*/g, '.*')
        .replace(/\?/g, '.')
    );
    return regex.test(filePath);
  });
}

/**
 * Get changed files in a pull request
 * @param {Object} context - Probot context
 * @returns {Promise<Array>} Array of changed files
 */
async function getChangedFiles(context) {
  try {
    const { data: files } = await context.octokit.pulls.listFiles({
      owner: context.payload.repository.owner.login,
      repo: context.payload.repository.name,
      pull_number: context.payload.pull_request.number
    });

    logger.debug(`Found ${files.length} changed files in PR`);
    return files;
  } catch (error) {
    logger.error('Error fetching changed files:', error);
    return [];
  }
}

/**
 * Post a comment on a pull request
 * @param {Object} context - Probot context
 * @param {string} body - Comment body
 * @returns {Promise<void>}
 */
async function postPRComment(context, body) {
  try {
    await context.octokit.issues.createComment({
      owner: context.payload.repository.owner.login,
      repo: context.payload.repository.name,
      issue_number: context.payload.pull_request.number,
      body
    });
    logger.debug('Posted comment to PR');
  } catch (error) {
    logger.error('Error posting PR comment:', error);
  }
}

/**
 * Create or update a check run
 * @param {Object} context - Probot context
 * @param {Object} options - Check run options
 * @returns {Promise<Object>} Check run result
 */
async function createCheckRun(context, options) {
  try {
    const { data: checkRun } = await context.octokit.checks.create({
      owner: context.payload.repository.owner.login,
      repo: context.payload.repository.name,
      name: options.name || 'CodeAudit.sh',
      head_sha: context.payload.pull_request?.head?.sha || context.payload.after,
      status: options.status || 'completed',
      conclusion: options.conclusion,
      output: options.output
    });

    logger.debug('Created check run', { checkRunId: checkRun.id });
    return checkRun;
  } catch (error) {
    logger.error('Error creating check run:', error);
    return null;
  }
}

module.exports = {
  setupGitHubApp,
  shouldExcludeFile,
  getChangedFiles,
  postPRComment,
  createCheckRun
};
