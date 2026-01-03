# CodeAudit.sh Documentation

Welcome to the official documentation for **CodeAudit.sh** - an automated code audit GitHub App built with Probot.

## 🔍 What is CodeAudit.sh?

CodeAudit.sh is a powerful GitHub App that automatically audits your pull requests for:

- 🔒 **Security vulnerabilities**
- 📊 **Code quality issues**
- ✨ **Best practices violations**
- 🎯 **Multi-language support**

## 🚀 Quick Start

### 1. Install the GitHub App

Visit the [CodeAudit.sh GitHub App](https://github.com/apps/codeaudit-sh) and install it on your repositories.

### 2. Configure Your Repository

Create a `.codeaudit.yml` file in your repository root:

```yaml
enabled: true
addLabels: true

audit:
  languages:
    - javascript
    - python
  
  tools:
    eslint:
      enabled: true
    bandit:
      enabled: true
  
  thresholds:
    critical: 0
    high: 5
    medium: 10

comment:
  enabled: true
  updateExisting: true
```

### 3. Open a Pull Request

CodeAudit.sh will automatically run on new pull requests and post audit results as comments.

## 📚 Features

### Automated Code Auditing

CodeAudit.sh automatically analyzes your code when you open or update pull requests:

- Detects programming languages
- Runs appropriate audit tools
- Reports findings with severity levels
- Adds labels based on audit results

### Multi-Language Support

Supports multiple programming languages out of the box:

- JavaScript / TypeScript
- Python
- Go
- Rust
- Java
- Shell scripts
- And more...

### Integrated Tools

Uses industry-standard tools:

- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting
- **ShellCheck** - Shell script analysis
- **Bandit** - Python security scanning
- **Semgrep** - Pattern-based analysis

### Smart Reporting

- Posts results as PR comments
- Categorizes by severity (Critical, High, Medium, Low)
- Shows affected files and lines
- Provides actionable recommendations

## 📖 Documentation

### Installation

For detailed installation instructions, see the main [README.md](https://github.com/SolanaRemix/code-audit/blob/main/README.md).

### Configuration

Learn how to configure CodeAudit.sh for your needs:

- [Configuration Reference](https://github.com/SolanaRemix/code-audit/blob/main/.codeaudit.example.yml)
- Customize audit tools
- Set severity thresholds
- Configure label naming
- Integration options

### Self-Hosting

Want to run your own instance?

```bash
# Clone the repository
git clone https://github.com/SolanaRemix/code-audit.git
cd code-audit

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your GitHub App credentials

# Start the app
npm start
```

See [README.md](https://github.com/SolanaRemix/code-audit/blob/main/README.md#option-2-self-host) for complete self-hosting instructions.

## 🛠️ Development

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- Git

### Setup Development Environment

```bash
# Clone and setup
git clone https://github.com/SolanaRemix/code-audit.git
cd code-audit
npm install

# Run development server
npm run dev
```

### Project Structure

```
code-audit/
├── app.js                  # Main entry point
├── package.json            # Dependencies
├── src/
│   ├── config.js          # Configuration loader
│   ├── logger.js          # Logging utility
│   ├── githubApp.js       # GitHub integration
│   ├── auditRunner.js     # Audit orchestration
│   ├── analyzers/         # Language detection & tools
│   └── reporting/         # Report generation
├── scripts/               # Utility scripts
└── .github/workflows/     # CI/CD pipelines
```

### Contributing

We welcome contributions! See our [Contributing Guide](https://github.com/SolanaRemix/code-audit/blob/main/CONTRIBUTING.md).

## 🔗 Resources

- **GitHub Repository**: [SolanaRemix/code-audit](https://github.com/SolanaRemix/code-audit)
- **Issues**: [Report bugs or request features](https://github.com/SolanaRemix/code-audit/issues)
- **Discussions**: [Join the community](https://github.com/SolanaRemix/code-audit/discussions)
- **License**: [MIT License](https://github.com/SolanaRemix/code-audit/blob/main/LICENSE)

## 💬 Support

Need help?

- 📖 Check the [README](https://github.com/SolanaRemix/code-audit/blob/main/README.md)
- 🐛 [Open an issue](https://github.com/SolanaRemix/code-audit/issues)
- 💡 [Start a discussion](https://github.com/SolanaRemix/code-audit/discussions)

## 💝 Sponsors

Support this project! See [SPONSORS.md](https://github.com/SolanaRemix/code-audit/blob/main/SPONSORS.md) for sponsorship information.

## 📄 License

CodeAudit.sh is released under the [MIT License](https://github.com/SolanaRemix/code-audit/blob/main/LICENSE).

---

**Made with ❤️ by the CodeAudit.sh Team**

[Get Started →](https://github.com/apps/codeaudit-sh)
