/**
 * CodeAudit.sh - GitHub App for automated code auditing
 * 
 * This is the main entry point for the Probot app.
 * It listens to GitHub events and triggers code audits on pull requests.
 */

const { loadConfig } = require('./src/config');
const logger = require('./src/logger');
const { setupGitHubApp } = require('./src/githubApp');
const { runAudit } = require('./src/auditRunner');

/**
 * Main application entry point
 * @param {import('probot').Probot} app - Probot instance
 */
module.exports = (app) => {
  logger.info('CodeAudit.sh app loaded successfully');

  setupGitHubApp(app);

  // Listen to pull request events
  app.on(['pull_request.opened', 'pull_request.synchronize'], async (context) => {
    logger.info(`Received PR event: ${context.payload.action} on PR #${context.payload.pull_request.number}`);
    
    try {
      const config = await loadConfig(context);
      const result = await runAudit(context, config);
      
      logger.info(`Audit completed for PR #${context.payload.pull_request.number}`, { result });
    } catch (error) {
      logger.error('Error running audit:', error);
      
      // Post error comment to PR
      await context.octokit.issues.createComment({
        ...context.repo(),
        issue_number: context.payload.pull_request.number,
        body: '⚠️ CodeAudit.sh encountered an error while auditing this PR. Please check the logs for details.'
      });
    }
  });

  // Listen to push events on main branch
  app.on('push', async (context) => {
    const defaultBranch = context.payload.repository.default_branch;
    const pushedBranch = context.payload.ref.replace('refs/heads/', '');
    
    if (pushedBranch === defaultBranch) {
      logger.info(`Push to default branch (${defaultBranch}), triggering audit`);
      
      try {
        const config = await loadConfig(context);
        const result = await runAudit(context, config);
        
        logger.info(`Audit completed for push to ${defaultBranch}`, { result });
      } catch (error) {
        logger.error('Error running audit on push:', error);
      }
    }
  });

  // Health check endpoint
  app.on('ping', async (context) => {
    logger.info('Received ping event');
  });
};
