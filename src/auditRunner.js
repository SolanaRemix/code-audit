/**
 * Audit Runner
 * 
 * Main orchestration for running code audits on pull requests
 */

const logger = require('./logger');
const { detectLanguages } = require('./analyzers/languageDetection');
const { getTools } = require('./analyzers/toolRegistry');
const { executeTools } = require('./analyzers/executors');
const { buildSummary } = require('./reporting/summaryBuilder');
const { formatComment } = require('./reporting/commentFormatter');

/**
 * Run audit on pull request
 * @param {Object} context - Probot context
 * @param {Object} config - Audit configuration
 * @returns {Promise<Object>} Audit results
 */
async function runAudit(context, config) {
  const { payload } = context;
  const pr = payload.pull_request;
  
  logger.info(`Starting audit for PR #${pr.number}`);

  try {
    // Step 1: Get changed files in the PR
    const files = await getChangedFiles(context);
    logger.info(`Found ${files.length} changed files`);

    if (files.length === 0) {
      return {
        comment: '✅ No files to audit.',
        labels: [config.labels.passed]
      };
    }

    // Step 2: Detect languages
    const languages = detectLanguages(files);
    logger.info(`Detected languages: ${languages.join(', ')}`);

    // Step 3: Get applicable audit tools
    const tools = getTools(languages, config);
    logger.info(`Using tools: ${tools.map(t => t.name).join(', ')}`);

    // Step 4: Clone repository and checkout PR branch
    const repoPath = await cloneRepository(context);

    // Step 5: Execute audit tools
    const results = await executeTools(tools, files, repoPath, config);
    logger.info(`Audit completed with ${results.length} findings`);

    // Step 6: Build summary
    const summary = buildSummary(results, config);

    // Step 7: Format comment
    const comment = formatComment(summary, config);

    // Step 8: Determine labels
    const labels = determineLabels(summary, config);

    return { comment, labels, summary };
  } catch (error) {
    logger.error('Error running audit:', error);
    throw error;
  }
}

/**
 * Get changed files in pull request
 * @param {Object} context - Probot context
 * @returns {Promise<Array>} List of changed files
 */
async function getChangedFiles(context) {
  const { payload } = context;
  const pr = payload.pull_request;

  const { data: files } = await context.octokit.pulls.listFiles({
    owner: payload.repository.owner.login,
    repo: payload.repository.name,
    pull_number: pr.number,
    per_page: 100
  });

  return files.filter(file => file.status !== 'removed').map(file => ({
    filename: file.filename,
    status: file.status,
    additions: file.additions,
    deletions: file.deletions,
    changes: file.changes,
    patch: file.patch
  }));
}

/**
 * Clone repository and checkout PR branch
 * NOTE: This is a placeholder implementation for scaffolding.
 * In production, implement actual git cloning using simple-git library.
 * @param {Object} context - Probot context
 * @returns {Promise<string>} Path to cloned repository
 */
async function cloneRepository(context) {
  const { payload } = context;
  const pr = payload.pull_request;
  
  // TODO: Implement actual repository cloning
  // Example using simple-git:
  // const git = require('simple-git');
  // const repoPath = `/tmp/audit-${payload.repository.name}-${pr.number}`;
  // await git.clone(payload.repository.clone_url, repoPath);
  // await git.cwd(repoPath).checkout(pr.head.ref);
  // return repoPath;
  
  logger.info(`Would clone repository: ${payload.repository.clone_url}`);
  logger.info(`Would checkout branch: ${pr.head.ref}`);
  
  // Return a mock path for scaffolding
  return `/tmp/audit-${payload.repository.name}-${pr.number}`;
}

/**
 * Determine labels based on audit results
 * @param {Object} summary - Audit summary
 * @param {Object} config - Configuration
 * @returns {Array<string>} Labels to apply
 */
function determineLabels(summary, config) {
  const labels = [];

  if (summary.critical > config.audit.thresholds.critical) {
    labels.push(config.labels.critical);
    labels.push(config.labels.failed);
  } else if (summary.high > config.audit.thresholds.high) {
    labels.push(config.labels.high);
    labels.push(config.labels.failed);
  } else if (summary.medium > config.audit.thresholds.medium) {
    labels.push(config.labels.medium);
  } else if (summary.low > config.audit.thresholds.low) {
    labels.push(config.labels.low);
  } else {
    labels.push(config.labels.passed);
  }

  return labels;
}

module.exports = {
  runAudit
};
