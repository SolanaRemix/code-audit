/**
 * Summary Builder
 * 
 * Builds audit summary from tool results
 */

const logger = require('../logger');

/**
 * Build audit summary from results
 * @param {Array} results - Audit results
 * @param {Object} config - Configuration
 * @returns {Object} Summary object
 */
function buildSummary(results, config) {
  const summary = {
    total: results.length,
    critical: 0,
    high: 0,
    medium: 0,
    low: 0,
    info: 0,
    byTool: {},
    byFile: {},
    findings: results
  };

  // Count by severity
  results.forEach(result => {
    const severity = normalizeSeverity(result.severity);
    
    if (severity === 'critical') summary.critical++;
    else if (severity === 'high') summary.high++;
    else if (severity === 'medium') summary.medium++;
    else if (severity === 'low') summary.low++;
    else summary.info++;

    // Count by tool
    if (!summary.byTool[result.tool]) {
      summary.byTool[result.tool] = 0;
    }
    summary.byTool[result.tool]++;

    // Count by file
    if (result.file) {
      if (!summary.byFile[result.file]) {
        summary.byFile[result.file] = 0;
      }
      summary.byFile[result.file]++;
    }
  });

  // Determine overall status
  summary.status = determineStatus(summary, config);

  logger.debug('Audit summary built', {
    total: summary.total,
    critical: summary.critical,
    high: summary.high,
    status: summary.status
  });

  return summary;
}

/**
 * Normalize severity to standard levels
 * @param {string} severity - Original severity
 * @returns {string} Normalized severity
 */
function normalizeSeverity(severity) {
  const normalized = severity.toLowerCase();
  
  if (['critical', 'blocker'].includes(normalized)) {
    return 'critical';
  } else if (['high', 'error'].includes(normalized)) {
    return 'high';
  } else if (['medium', 'warning', 'warn'].includes(normalized)) {
    return 'medium';
  } else if (['low', 'minor'].includes(normalized)) {
    return 'low';
  } else {
    return 'info';
  }
}

/**
 * Determine overall status
 * @param {Object} summary - Summary object
 * @param {Object} config - Configuration
 * @returns {string} Status (passed/failed)
 */
function determineStatus(summary, config) {
  const thresholds = config.audit.thresholds;

  if (summary.critical > thresholds.critical) {
    return 'failed';
  }
  if (summary.high > thresholds.high) {
    return 'failed';
  }
  if (summary.medium > thresholds.medium) {
    return 'warning';
  }
  if (summary.low > thresholds.low) {
    return 'warning';
  }

  return 'passed';
}

/**
 * Get top issues
 * @param {Array} results - Audit results
 * @param {number} limit - Number of top issues to return
 * @returns {Array} Top issues
 */
function getTopIssues(results, limit = 10) {
  return results
    .sort((a, b) => {
      const severityOrder = { critical: 0, high: 1, medium: 2, low: 3, info: 4 };
      const aSev = normalizeSeverity(a.severity);
      const bSev = normalizeSeverity(b.severity);
      return severityOrder[aSev] - severityOrder[bSev];
    })
    .slice(0, limit);
}

module.exports = {
  buildSummary,
  normalizeSeverity,
  determineStatus,
  getTopIssues
};
