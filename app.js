/**
 * CodeAudit.sh - Probot App
 * 
 * This is the main entry point for the CodeAudit.sh GitHub App.
 * It listens for pull request events and runs automated code audits.
 */

const { loadConfig } = require('./src/config');
const logger = require('./src/logger');
const { setupGitHubApp } = require('./src/githubApp');
const { runAudit } = require('./src/auditRunner');

module.exports = (app) => {
  logger.info('CodeAudit.sh app loaded');

  // Listen for pull request opened or synchronized events
  app.on(['pull_request.opened', 'pull_request.synchronize'], async (context) => {
    const { payload } = context;
    const pr = payload.pull_request;
    
    logger.info(`Processing PR #${pr.number}: ${pr.title}`);

    try {
      // Load configuration from repository
      const config = await loadConfig(context);
      
      if (!config.enabled) {
        logger.info('CodeAudit.sh is disabled in configuration');
        return;
      }

      // Run the audit
      const auditResults = await runAudit(context, config);

      // Post results as a comment on the PR
      await context.octokit.issues.createComment({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        issue_number: pr.number,
        body: auditResults.comment
      });

      // Optionally add labels based on audit results
      if (config.addLabels && auditResults.labels.length > 0) {
        await context.octokit.issues.addLabels({
          owner: payload.repository.owner.login,
          repo: payload.repository.name,
          issue_number: pr.number,
          labels: auditResults.labels
        });
      }

      logger.info(`Audit completed for PR #${pr.number}`);
    } catch (error) {
      logger.error('Error running audit:', error);
      
      // Post error comment to PR
      await context.octokit.issues.createComment({
        owner: payload.repository.owner.login,
        repo: payload.repository.name,
        issue_number: pr.number,
        body: `❌ **CodeAudit.sh Error**\n\nAn error occurred while running the audit:\n\`\`\`\n${error.message}\n\`\`\``
      });
    }
  });

  // Listen for check_run rerequested event
  app.on('check_run.rerequested', async (context) => {
    logger.info('Check run rerequested');
    // Handle rerun logic here if needed
  });

  // Setup GitHub App integration
  setupGitHubApp(app);
};
