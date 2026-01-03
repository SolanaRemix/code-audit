# CyberAi.network - Automated Code Audit & Certificate System

![Audit Status](https://img.shields.io/badge/audit-automated-blue)
![Security](https://img.shields.io/badge/security-enabled-brightgreen)
![Certificate](https://img.shields.io/badge/certificate-issuing-success)

An automated code audit and certificate label issuing system for GitHub repositories under CyberAi.network. This system provides continuous security analysis, vulnerability detection, and automated certificate generation for code repositories.

## 🔍 Overview

This repository implements an enterprise-grade automated code audit system that:

- **Automatically scans code** for security vulnerabilities using GitHub's CodeQL
- **Issues audit certificates** with unique IDs and verification hashes
- **Applies labels** to pull requests based on audit results
- **Generates reports** with detailed security analysis
- **Maintains audit history** with artifact retention

## 🚀 Features

### Automated Security Scanning
- CodeQL integration for comprehensive security analysis
- Multi-language support (JavaScript, Python, and extensible to others)
- Scheduled weekly audits and on-demand triggers
- Real-time pull request scanning

### Certificate Issuance System
- Unique certificate ID generation for each audit
- Digital signature with SHA-256 hashing
- 90-day certificate validity period
- Verification instructions included

### Intelligent Labeling
- Automatic label creation and management
- Status labels: `audit:passed`, `audit:failed`, `audit:pending`
- Security labels: `security:verified`, `security:needs-review`
- Certificate tracking: `certificate:issued`

### Audit Reports
- Markdown-formatted certificates
- JSON metadata for programmatic access
- Artifact preservation (90-day retention)
- PR comments with audit summaries

## 📋 How It Works

### Workflow Triggers

The audit system runs automatically on:
- **Push** to main/master/develop branches
- **Pull requests** to main/master/develop branches
- **Scheduled** weekly scans (Mondays at 9:00 AM UTC)
- **Manual** workflow dispatch

### Audit Process

1. **Code Checkout**: Repository code is checked out
2. **CodeQL Analysis**: Security scanning using GitHub's CodeQL
3. **Audit Execution**: Comprehensive security audit performed
4. **Certificate Generation**: Unique certificate created with digital signature
5. **Label Application**: Appropriate labels applied to PRs
6. **Report Upload**: Certificate and metadata uploaded as artifacts
7. **Notification**: PR comment posted with audit summary

## 🏷️ Audit Labels

| Label | Color | Description |
|-------|-------|-------------|
| `audit:passed` | 🟢 Green | Code audit passed successfully |
| `audit:failed` | 🔴 Red | Code audit failed - needs attention |
| `audit:pending` | 🟡 Yellow | Code audit in progress |
| `security:verified` | 🟢 Green | Security verification completed |
| `security:needs-review` | 🔴 Red | Security review required |
| `certificate:issued` | 🔵 Blue | Audit certificate issued |

## 📜 Certificate Structure

Each audit generates a certificate containing:

- **Certificate ID**: Unique identifier (UUID)
- **Issue Date**: Timestamp of audit
- **Validity Period**: 90 days from issue date
- **Status**: Passed/Failed/Pending
- **Repository Info**: Full repository and commit details
- **Security Analysis**: Scan results and findings
- **Digital Signature**: SHA-256 hash for verification

### Example Certificate

```markdown
# Code Audit Certificate

## Certificate Information
- **Certificate ID:** abc123-def456-ghi789
- **Issue Date:** 2026-01-03 12:00:00 UTC
- **Valid Until:** 2026-04-03 12:00:00 UTC
- **Status:** PASSED

## Repository Information
- **Repository:** SolanaRemix/code-audit
- **Branch:** main
- **Commit:** abc123def456

[... full certificate details ...]
```

## 🔧 Setup & Configuration

### Prerequisites

- GitHub repository with Actions enabled
- Appropriate permissions for security events and labels
- Python 3.11+ (for certificate generation)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/SolanaRemix/code-audit.git
   cd code-audit
   ```

2. **Enable GitHub Actions**
   - Workflows are automatically enabled when pushed to your repository
   - Ensure Security events permissions are granted

3. **Configure Languages**
   - Edit `.github/workflows/code-audit.yml`
   - Modify the `matrix.language` array to include your languages:
     ```yaml
     matrix:
       language: [ 'javascript', 'python', 'go', 'java' ]
     ```

### Customization

#### Adding More Languages

Edit `.github/workflows/code-audit.yml`:

```yaml
matrix:
  language: [ 'javascript', 'python', 'go', 'java', 'cpp', 'csharp' ]
```

#### Adjusting Scan Schedule

Modify the cron expression:

```yaml
schedule:
  - cron: '0 9 * * 1'  # Weekly on Mondays at 9 AM UTC
```

#### Certificate Validity Period

Edit `.github/scripts/generate_certificate.py`:

```python
valid_until = issue_date + datetime.timedelta(days=90)  # Change 90 to desired days
```

## 📊 Viewing Audit Results

### In Pull Requests

Audit results appear as:
1. **Labels** on the PR
2. **Comments** with detailed audit summary
3. **Workflow status** checks

### In GitHub Actions

1. Navigate to **Actions** tab
2. Select **Automated Code Audit** workflow
3. View run details and download artifacts

### Downloading Certificates

1. Go to workflow run
2. Scroll to **Artifacts** section
3. Download `audit-certificate-[ID]`

## 🛡️ Security Features

- **Static Analysis**: CodeQL security and quality queries
- **Vulnerability Detection**: Automatic identification of security issues
- **Best Practices**: Code quality and compliance checking
- **Dependency Scanning**: Detection of vulnerable dependencies
- **Audit Trail**: Complete history of all audits

## 📈 Integration with CI/CD

This system integrates seamlessly with your existing CI/CD pipeline:

```yaml
# Example: Require audit to pass before merge
jobs:
  deploy:
    needs: security-audit
    runs-on: ubuntu-latest
    steps:
      - name: Deploy
        run: ./deploy.sh
```

## 🔐 Certificate Verification

To verify an audit certificate:

1. **Check Certificate ID**: Ensure it matches the workflow run
2. **Verify Commit Hash**: Confirm it corresponds to the audited commit
3. **Validate Digital Signature**: Use the certificate hash for verification
4. **Check Validity Period**: Ensure certificate hasn't expired

## 📝 Example Usage

### Manual Trigger

```bash
# Via GitHub CLI
gh workflow run code-audit.yml

# Via GitHub UI
Actions → Automated Code Audit → Run workflow
```

### API Access

Certificates include metadata JSON for programmatic access:

```json
{
  "certificate_id": "abc123-def456",
  "repository": "SolanaRemix/code-audit",
  "status": "passed",
  "issue_date": "2026-01-03T12:00:00"
}
```

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request
5. Ensure audit passes

## 📄 License

This project is part of the CyberAi.network security infrastructure.

## 🔗 Links

- [GitHub Security Documentation](https://docs.github.com/en/code-security)
- [CodeQL Documentation](https://codeql.github.com/docs/)
- [CyberAi.network](https://github.com/CyberIntellAI)

## 💬 Support

For issues, questions, or suggestions:
- Open an issue in this repository
- Review existing audit workflow runs
- Check the documentation

---

**Powered by CyberAi.network** | **Automated Security Audit System** | **Version 1.0.0** 
