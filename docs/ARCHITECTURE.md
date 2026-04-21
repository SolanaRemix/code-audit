# System Architecture - CyberAi.network Code Audit System

## 🏗️ System Overview

The automated code audit and certificate label issuing system provides continuous security monitoring for GitHub repositories through integrated GitHub Actions workflows.

## 📐 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     Developer Actions                        │
│  (Push, Pull Request, Scheduled Run, Manual Trigger)        │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│               GitHub Actions Workflow                        │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  1. Code Checkout                                     │  │
│  │     - Clone repository                                │  │
│  │     - Setup environment                               │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
│                         ▼                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  2. CodeQL Security Scan                             │  │
│  │     - Initialize CodeQL                               │  │
│  │     - Autobuild code                                  │  │
│  │     - Run security queries                            │  │
│  │     - Analyze results                                 │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
│                         ▼                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  3. Security Audit                                    │  │
│  │     - Aggregate scan results                          │  │
│  │     - Determine pass/fail status                      │  │
│  │     - Generate audit ID (UUID)                        │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
│                         ▼                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  4. Certificate Generation                            │  │
│  │     - Run Python certificate generator                │  │
│  │     - Create markdown certificate                     │  │
│  │     - Generate JSON metadata                          │  │
│  │     - Calculate SHA-256 hash                          │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
│                         ▼                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  5. Label Management                                  │  │
│  │     - Create labels (if needed)                       │  │
│  │     - Apply status labels to PR                       │  │
│  │     - Update label descriptions                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                         │                                    │
│                         ▼                                    │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  6. Notification & Artifact Upload                    │  │
│  │     - Post PR comment with results                    │  │
│  │     - Upload certificate artifact                     │  │
│  │     - Store metadata                                  │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│                        Outputs                               │
│                                                              │
│  • PR Labels (audit:passed/failed, security:verified)       │
│  • PR Comments with audit summary                           │
│  • Certificate artifacts (90-day retention)                 │
│  • CodeQL security alerts                                   │
│  • Workflow status checks                                   │
└─────────────────────────────────────────────────────────────┘
```

## 🔧 Component Details

### 1. GitHub Actions Workflow (`code-audit.yml`)

**Purpose:** Orchestrates the entire audit process

**Key Features:**
- Multi-language CodeQL scanning (JavaScript, Python)
- Parallel job execution for efficiency
- Configurable triggers (push, PR, schedule, manual)
- Automated label creation and management
- PR comment generation
- Artifact management

**Permissions Required:**
- `contents: read` - Read repository code
- `security-events: write` - Upload security scan results
- `pull-requests: write` - Comment on PRs
- `issues: write` - Manage labels

### 2. Certificate Generator (`generate_certificate.py`)

**Purpose:** Creates audit certificates with verification data

**Input Parameters:**
- `--status` - Audit status (passed/failed/pending)
- `--date` - Audit timestamp
- `--id` - Unique certificate ID (UUID)
- `--repo` - Repository name
- `--branch` - Branch name
- `--commit` - Commit SHA

**Output Files:**
- `audit_certificate.md` - Human-readable certificate
- `audit_certificate_metadata.json` - Machine-readable metadata

**Security Features:**
- SHA-256 hash for verification
- No hardcoded secrets
- Secure exception handling
- UUID4 for unique IDs

### 3. CodeQL Configuration (`codeql-config.yml`)

**Purpose:** Customize security scanning behavior

**Configuration Options:**
- Query selection (security-and-quality, security-extended)
- Path filtering (include/exclude patterns)
- Language-specific packs
- Custom scanning rules

### 4. Label System

**Labels Created:**

| Label | Purpose | Auto-Applied |
|-------|---------|-------------|
| `audit:passed` | Audit successful | Yes (on pass) |
| `audit:failed` | Audit failed | Yes (on fail) |
| `audit:pending` | Audit in progress | Yes (during run) |
| `security:verified` | Security approved | Yes (on pass) |
| `security:needs-review` | Security issues | Yes (on fail) |
| `certificate:issued` | Certificate generated | No (manual) |

## 🔄 Workflow Triggers

### 1. Push Events
```yaml
on:
  push:
    branches: [ main, master, develop ]
```
- Runs on commits to protected branches
- Validates code before merge

### 2. Pull Request Events
```yaml
on:
  pull_request:
    branches: [ main, master, develop ]
```
- Runs on PR creation/update
- Blocks merge if failed (configurable)
- Posts results as PR comments

### 3. Scheduled Events
```yaml
on:
  schedule:
    - cron: '0 9 * * 1'  # Weekly on Mondays
```
- Regular security audits
- Catches new vulnerabilities in dependencies

### 4. Manual Dispatch
```yaml
on:
  workflow_dispatch:
```
- On-demand audits
- Testing and validation

## 📊 Data Flow

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│  Source  │────▶│ Analysis │────▶│ Results  │
│   Code   │     │  Engine  │     │          │
└──────────┘     └──────────┘     └──────────┘
                       │
                       ▼
                ┌──────────────┐
                │  Certificate │
                │  Generator   │
                └──────────────┘
                       │
                       ▼
                ┌──────────────┐
                │   Outputs    │
                │ • Labels     │
                │ • Comments   │
                │ • Artifacts  │
                └──────────────┘
```

## 🔐 Security Considerations

### Secrets Management
- No secrets stored in code
- GitHub tokens provided by Actions
- Certificate generator runs in isolated environment

### Permission Model
- Least privilege principle
- Read-only access to code
- Write access only for labels/comments
- Security events isolated

### Audit Trail
- All runs logged in Actions
- Certificates stored as artifacts
- Metadata for compliance tracking
- 90-day retention policy

## 📈 Scalability

### Performance Optimization
- Parallel CodeQL scanning by language
- Conditional job execution
- Artifact compression
- Efficient caching strategies

### Multi-Repository Support
- Template workflow for reuse
- Centralized certificate generator
- Shared label definitions
- Organization-level policies

## 🧪 Testing Strategy

### Unit Tests
- Certificate generator logic
- Input validation
- Hash generation
- Date handling

### Integration Tests
- Full workflow execution
- Label creation/update
- PR comment posting
- Artifact upload

### Security Tests
- CodeQL on system code
- Dependency scanning
- Secrets detection
- Permission validation

## 📦 Dependencies

### GitHub Actions
- `actions/checkout@v4` - Code checkout
- `github/codeql-action/*@v3` - Security scanning
- `actions/setup-python@v5` - Python environment
- `actions/github-script@v7` - GitHub API automation
- `actions/upload-artifact@v4` - Artifact management

### Python Packages
- Standard library only (no external dependencies)
- `hashlib` - Certificate hashing
- `secrets` - Secure random generation
- `uuid` - Unique ID generation
- `json` - Metadata serialization
- `datetime` - Timestamp handling

## 🔄 Maintenance

### Regular Updates
- GitHub Actions version bumps
- CodeQL query updates
- Security patch application
- Documentation updates

### Monitoring
- Workflow success rates
- Scan duration metrics
- Certificate generation stats
- Label usage analytics

## 📚 References

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [CodeQL Documentation](https://codeql.github.com/docs/)
- [GitHub Security](https://docs.github.com/en/code-security)
- [SARIF Format](https://docs.oasis-open.org/sarif/sarif/v2.1.0/sarif-v2.1.0.html)

---

**Version:** 1.0.0  
**Last Updated:** 2026-01-03  
**Maintained By:** CyberAi.network
