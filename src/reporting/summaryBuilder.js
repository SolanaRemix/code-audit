/**
 * Summary Builder
 * Builds audit summaries from analysis results
 */

const logger = require('../logger');

/**
 * Build summary from analysis results
 * @param {Array} results - Array of analysis results
 * @param {Object} config - Configuration
 * @returns {Object} Summary object
 */
function buildSummary(results, config) {
  logger.debug('Building audit summary');
  
  const summary = {
    filesAnalyzed: 0,
    analyzersRun: results.length,
    errors: 0,
    warnings: 0,
    infos: 0,
    totalIssues: 0,
    issuesByFile: {},
    issuesBySeverity: {
      error: [],
      warning: [],
      info: []
    },
    issuesByAnalyzer: {},
    executionTime: 0
  };
  
  // Process each result
  results.forEach(result => {
    if (result.error) {
      logger.warn(`Analyzer ${result.analyzer} failed: ${result.error}`);
      return;
    }
    
    summary.filesAnalyzed += result.filesAnalyzed || 0;
    summary.executionTime += result.executionTime || 0;
    
    // Initialize analyzer stats
    if (!summary.issuesByAnalyzer[result.analyzer]) {
      summary.issuesByAnalyzer[result.analyzer] = {
        total: 0,
        errors: 0,
        warnings: 0,
        infos: 0
      };
    }
    
    // Process issues
    if (result.issues && result.issues.length > 0) {
      result.issues.forEach(issue => {
        // Count by severity
        const severity = (issue.severity || 'warning').toLowerCase();
        
        if (severity === 'error') {
          summary.errors++;
          summary.issuesByAnalyzer[result.analyzer].errors++;
        } else if (severity === 'warning') {
          summary.warnings++;
          summary.issuesByAnalyzer[result.analyzer].warnings++;
        } else {
          summary.infos++;
          summary.issuesByAnalyzer[result.analyzer].infos++;
        }
        
        summary.totalIssues++;
        summary.issuesByAnalyzer[result.analyzer].total++;
        
        // Add to severity list
        if (summary.issuesBySeverity[severity]) {
          summary.issuesBySeverity[severity].push(issue);
        }
        
        // Count by file
        const file = issue.file || 'unknown';
        if (!summary.issuesByFile[file]) {
          summary.issuesByFile[file] = {
            errors: 0,
            warnings: 0,
            infos: 0,
            issues: []
          };
        }
        
        if (severity === 'error') {
          summary.issuesByFile[file].errors++;
        } else if (severity === 'warning') {
          summary.issuesByFile[file].warnings++;
        } else {
          summary.issuesByFile[file].infos++;
        }
        
        summary.issuesByFile[file].issues.push(issue);
      });
    }
  });
  
  logger.debug('Summary built', {
    filesAnalyzed: summary.filesAnalyzed,
    errors: summary.errors,
    warnings: summary.warnings,
    infos: summary.infos
  });
  
  return summary;
}

/**
 * Get top issues by severity
 * @param {Object} summary - Audit summary
 * @param {number} limit - Maximum number of issues to return
 * @returns {Array} Top issues
 */
function getTopIssues(summary, limit = 10) {
  const allIssues = [
    ...summary.issuesBySeverity.error,
    ...summary.issuesBySeverity.warning,
    ...summary.issuesBySeverity.info
  ];
  
  return allIssues.slice(0, limit);
}

/**
 * Get issues for a specific file
 * @param {Object} summary - Audit summary
 * @param {string} filename - File name
 * @returns {Array} Issues for the file
 */
function getIssuesForFile(summary, filename) {
  return summary.issuesByFile[filename]?.issues || [];
}

/**
 * Format summary as text
 * @param {Object} summary - Audit summary
 * @returns {string} Formatted summary
 */
function formatSummaryText(summary) {
  let text = '## Audit Summary\n\n';
  text += `- Files analyzed: ${summary.filesAnalyzed}\n`;
  text += `- Analyzers run: ${summary.analyzersRun}\n`;
  text += `- Total issues: ${summary.totalIssues}\n`;
  text += `  - Errors: ${summary.errors}\n`;
  text += `  - Warnings: ${summary.warnings}\n`;
  text += `  - Info: ${summary.infos}\n`;
  text += `- Execution time: ${summary.executionTime}ms\n`;
  
  return text;
}

module.exports = {
  buildSummary,
  getTopIssues,
  getIssuesForFile,
  formatSummaryText
};
