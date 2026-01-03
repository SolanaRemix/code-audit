/**
 * Audit Runner - Main orchestrator for code audits
 * Coordinates the analysis process across different tools and languages
 */

const logger = require('./logger');
const { detectLanguages } = require('./analyzers/languageDetection');
const { getAnalyzers } = require('./analyzers/index');
const { executeAnalyzers } = require('./analyzers/executors');
const { buildSummary } = require('./reporting/summaryBuilder');
const { formatComment } = require('./reporting/commentFormatter');
const { getChangedFiles, postPRComment, createCheckRun } = require('./githubApp');

/**
 * Run code audit on the context
 * @param {Object} context - Probot context
 * @param {Object} config - Audit configuration
 * @returns {Promise<Object>} Audit results
 */
async function runAudit(context, config) {
  logger.info('Starting code audit');

  if (!config.enabled) {
    logger.info('Code audit is disabled in configuration');
    return { skipped: true, reason: 'disabled' };
  }

  try {
    // Get changed files
    const changedFiles = await getChangedFiles(context);
    
    if (changedFiles.length === 0) {
      logger.info('No files to audit');
      return { skipped: true, reason: 'no_files' };
    }

    // Filter out excluded files
    const filesToAudit = changedFiles.filter(file => {
      const { shouldExcludeFile } = require('./githubApp');
      return !shouldExcludeFile(file.filename, config.exclude);
    });

    logger.info(`Auditing ${filesToAudit.length} files (${changedFiles.length} total)`);

    // Detect languages
    const languages = detectLanguages(filesToAudit);
    logger.debug('Detected languages', { languages });

    // Get analyzers for detected languages
    const analyzers = getAnalyzers(languages, config);
    logger.debug(`Found ${analyzers.length} analyzers to run`);

    if (analyzers.length === 0) {
      logger.info('No analyzers configured for detected languages');
      return { skipped: true, reason: 'no_analyzers' };
    }

    // Execute analyzers
    const results = await executeAnalyzers(context, filesToAudit, analyzers, config);
    logger.debug('Analyzer execution completed', { resultsCount: results.length });

    // Build summary
    const summary = buildSummary(results, config);
    logger.debug('Summary built', { summary });

    // Check thresholds
    const passed = checkThresholds(summary, config.thresholds);
    logger.info(`Audit ${passed ? 'passed' : 'failed'}`, { 
      errors: summary.errors,
      warnings: summary.warnings,
      infos: summary.infos
    });

    // Post comment if enabled
    if (config.comments.enabled && context.payload.pull_request) {
      const comment = formatComment(summary, passed);
      await postPRComment(context, comment);
    }

    // Create check run
    if (context.payload.pull_request) {
      await createCheckRun(context, {
        name: 'CodeAudit.sh',
        conclusion: passed ? 'success' : 'failure',
        output: {
          title: passed ? '✅ Code audit passed' : '❌ Code audit failed',
          summary: formatCheckRunSummary(summary),
          text: formatCheckRunDetails(results, config)
        }
      });
    }

    return {
      passed,
      summary,
      results,
      filesAudited: filesToAudit.length
    };

  } catch (error) {
    logger.error('Error running audit:', error);
    throw error;
  }
}

/**
 * Check if results pass configured thresholds
 * @param {Object} summary - Audit summary
 * @param {Object} thresholds - Configured thresholds
 * @returns {boolean} True if passed
 */
function checkThresholds(summary, thresholds) {
  const { errors, warnings, infos } = summary;
  
  // Check error threshold
  if (thresholds.error !== -1 && errors > thresholds.error) {
    return false;
  }
  
  // Check warning threshold
  if (thresholds.warning !== -1 && warnings > thresholds.warning) {
    return false;
  }
  
  // Check info threshold
  if (thresholds.info !== -1 && infos > thresholds.info) {
    return false;
  }
  
  return true;
}

/**
 * Format summary for check run
 * @param {Object} summary - Audit summary
 * @returns {string} Formatted summary
 */
function formatCheckRunSummary(summary) {
  return `Found ${summary.errors} errors, ${summary.warnings} warnings, and ${summary.infos} info messages across ${summary.filesAnalyzed} files.`;
}

/**
 * Format details for check run
 * @param {Array} results - Audit results
 * @param {Object} config - Configuration
 * @returns {string} Formatted details
 */
function formatCheckRunDetails(results, config) {
  const maxIssues = config.reporting.max_issues || 50;
  const allIssues = results.flatMap(r => r.issues || []);
  const limitedIssues = allIssues.slice(0, maxIssues);
  
  let text = '## Audit Results\n\n';
  
  limitedIssues.forEach((issue, index) => {
    text += `${index + 1}. **${issue.severity.toUpperCase()}**: ${issue.message}\n`;
    text += `   - File: ${issue.file}:${issue.line}\n`;
    text += `   - Rule: ${issue.rule}\n\n`;
  });
  
  if (allIssues.length > maxIssues) {
    text += `\n... and ${allIssues.length - maxIssues} more issues\n`;
  }
  
  return text;
}

module.exports = {
  runAudit
};
