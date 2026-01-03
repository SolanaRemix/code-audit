/**
 * Comment Formatter
 * 
 * Formats audit results as GitHub PR comments
 */

const { getTopIssues } = require('./summaryBuilder');

/**
 * Format audit summary as PR comment
 * @param {Object} summary - Audit summary
 * @param {Object} config - Configuration
 * @returns {string} Formatted comment
 */
function formatComment(summary, config) {
  let comment = '';

  // Header
  comment += formatHeader(summary);
  comment += '\n\n';

  // Summary stats
  comment += formatStats(summary);
  comment += '\n\n';

  // Findings by severity
  if (summary.total > 0) {
    comment += formatFindings(summary, config);
    comment += '\n\n';
  }

  // Tools used
  comment += formatToolsSummary(summary);
  comment += '\n\n';

  // Footer
  comment += formatFooter();

  return comment;
}

/**
 * Format comment header
 */
function formatHeader(summary) {
  const statusEmoji = {
    passed: '✅',
    warning: '⚠️',
    failed: '❌'
  };

  const emoji = statusEmoji[summary.status] || '📊';
  const title = summary.status === 'passed' 
    ? 'CodeAudit.sh - All Checks Passed!'
    : summary.status === 'warning'
    ? 'CodeAudit.sh - Warnings Found'
    : 'CodeAudit.sh - Issues Found';

  return `## ${emoji} ${title}`;
}

/**
 * Format summary statistics
 */
function formatStats(summary) {
  const stats = `
| Severity | Count |
|----------|-------|
| 🔴 Critical | ${summary.critical} |
| 🟠 High | ${summary.high} |
| 🟡 Medium | ${summary.medium} |
| 🔵 Low | ${summary.low} |
| ⚪ Info | ${summary.info} |
| **Total** | **${summary.total}** |
`;

  return stats.trim();
}

/**
 * Format findings section
 */
function formatFindings(summary, config) {
  let findings = '### 🔍 Findings\n\n';

  if (config.comment.includeFullReport) {
    const topIssues = getTopIssues(summary.findings, 20);
    
    if (config.comment.collapseDetails) {
      findings += '<details>\n<summary>Click to expand detailed findings</summary>\n\n';
    }

    topIssues.forEach((finding, index) => {
      findings += formatFinding(finding, index + 1);
    });

    if (summary.findings.length > 20) {
      findings += `\n*...and ${summary.findings.length - 20} more findings*\n`;
    }

    if (config.comment.collapseDetails) {
      findings += '\n</details>';
    }
  } else {
    findings += `Found ${summary.total} issue(s) across ${Object.keys(summary.byFile).length} file(s).\n`;
  }

  return findings;
}

/**
 * Format single finding
 */
function formatFinding(finding, index) {
  const severityEmoji = {
    critical: '🔴',
    high: '🟠',
    medium: '🟡',
    low: '🔵',
    info: '⚪'
  };

  const emoji = severityEmoji[finding.severity.toLowerCase()] || '⚪';
  const location = finding.line 
    ? `\`${finding.file}:${finding.line}\``
    : `\`${finding.file}\``;

  let formatted = `#### ${index}. ${emoji} ${finding.message}\n\n`;
  formatted += `- **Tool**: ${finding.tool}\n`;
  formatted += `- **Severity**: ${finding.severity}\n`;
  if (finding.file) {
    formatted += `- **Location**: ${location}\n`;
  }
  if (finding.rule) {
    formatted += `- **Rule**: \`${finding.rule}\`\n`;
  }
  formatted += '\n';

  return formatted;
}

/**
 * Format tools summary
 */
function formatToolsSummary(summary) {
  let tools = '### 🛠️ Tools Used\n\n';

  const toolEntries = Object.entries(summary.byTool)
    .sort((a, b) => b[1] - a[1]);

  toolEntries.forEach(([tool, count]) => {
    tools += `- **${tool}**: ${count} finding(s)\n`;
  });

  return tools;
}

/**
 * Format comment footer
 */
function formatFooter() {
  return `---
*Powered by [CodeAudit.sh](https://github.com/SolanaRemix/code-audit) 🔍*`;
}

/**
 * Format comment for error
 */
function formatErrorComment(error) {
  return `## ❌ CodeAudit.sh Error

An error occurred while running the audit:

\`\`\`
${error.message}
\`\`\`

Please check the application logs for more details.

---
*Powered by [CodeAudit.sh](https://github.com/SolanaRemix/code-audit) 🔍*`;
}

module.exports = {
  formatComment,
  formatErrorComment,
  formatHeader,
  formatStats,
  formatFindings,
  formatFinding
};
