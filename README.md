# CodeAudit.sh 🔍

> Automated code audit GitHub App powered by Probot

CodeAudit.sh is a powerful GitHub App that automatically audits your code for security vulnerabilities, code quality issues, and best practices violations. It integrates seamlessly with your pull request workflow to catch issues before they reach production.

## ✨ Features

- 🔒 **Security Analysis**: Detect common security vulnerabilities
- 📊 **Code Quality**: Analyze code quality and maintainability
- 🎯 **Language Support**: Multi-language static analysis
- 🤖 **Automated Reviews**: Automatic PR comments with findings
- ⚙️ **Customizable**: Configure rules and thresholds per repository
- 🚀 **Fast**: Efficient analysis with minimal overhead

## 🚀 Quick Start

### Prerequisites

- Node.js 18.0.0 or higher
- A GitHub App with appropriate permissions
- Webhook endpoint (or Smee.io for local development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SolanaRemix/code-audit.git
   cd code-audit
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or use the install script
   ./scripts/install.sh
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your GitHub App credentials
   ```

4. **Set up your GitHub App**
   - Create a new GitHub App at https://github.com/settings/apps
   - Set webhook URL (or use Smee.io for development)
   - Configure permissions: `contents: read`, `pull_requests: write`, `issues: write`
   - Subscribe to events: `pull_request`, `push`
   - Generate and download a private key

5. **Configure the app**
   ```bash
   # Update .env with your values
   APP_ID=your_app_id
   PRIVATE_KEY=path/to/private-key.pem
   WEBHOOK_SECRET=your_webhook_secret
   ```

6. **Start the app**
   ```bash
   npm start
   # or for development with auto-reload
   npm run dev
   ```

## 📖 Configuration

Create a `.codeaudit.yml` file in your repository root to customize the audit behavior:

```yaml
# Enable/disable specific analyzers
analyzers:
  security: true
  quality: true
  style: true
  complexity: true

# Language-specific settings
languages:
  javascript:
    enabled: true
    tools: [eslint, jshint]
  python:
    enabled: true
    tools: [pylint, bandit]
  go:
    enabled: true
    tools: [staticcheck, gosec]

# Severity thresholds
thresholds:
  error: 0      # Fail if any errors found
  warning: 10   # Fail if more than 10 warnings
  info: -1      # Ignore info messages

# Exclude patterns
exclude:
  - node_modules/**
  - dist/**
  - build/**
  - "*.min.js"

# Custom rules
rules:
  max-line-length: 120
  no-console: error
```

See `.codeaudit.example.yml` for a complete configuration example.

## 🔧 Scripts

The `scripts/` directory contains utility scripts for various operations:

- **setup.sh**: Initial setup and configuration
- **install.sh**: Install dependencies and tools
- **deploy.sh**: Deploy to production (Vercel, Heroku, etc.)
- **ui.sh**: Manage UI components (if applicable)
- **db.sh**: Database operations (if applicable)
- **updates.sh**: Update dependencies and tools
- **api.sh**: API testing and management
- **config.sh**: Configuration management
- **network.sh**: Network diagnostics and testing

## 🏗️ Architecture

```
.
├── app.js                    # Main application entry point
├── src/
│   ├── config.js             # Configuration loader
│   ├── logger.js             # Logging utility
│   ├── githubApp.js          # GitHub App setup
│   ├── auditRunner.js        # Main audit orchestrator
│   ├── analyzers/
│   │   ├── index.js          # Analyzer registry
│   │   ├── languageDetection.js
│   │   ├── toolRegistry.js   # Available analysis tools
│   │   └── executors.js      # Tool execution logic
│   └── reporting/
│       ├── summaryBuilder.js # Build audit summaries
│       └── commentFormatter.js # Format PR comments
├── scripts/                  # Utility scripts
└── .github/workflows/        # CI/CD workflows
```

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details on:

- Code of Conduct
- Development workflow
- Submitting pull requests
- Reporting issues

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💖 Sponsors

Support this project! See [SPONSORS.md](SPONSORS.md) for sponsorship opportunities.

## 🔗 Links

- [GitHub App Manifest](manifest.yml)
- [Documentation](docs/index.md)
- [GitHub Pages](https://codeaudit.github.io) (once configured)
- [Issues](https://github.com/SolanaRemix/code-audit/issues)
- [Pull Requests](https://github.com/SolanaRemix/code-audit/pulls)

## 📊 Status

[![CodeAudit App](https://github.com/SolanaRemix/code-audit/actions/workflows/codeaudit-app.yml/badge.svg)](https://github.com/SolanaRemix/code-audit/actions/workflows/codeaudit-app.yml)
[![Self Test](https://github.com/SolanaRemix/code-audit/actions/workflows/codeaudit-self-test.yml/badge.svg)](https://github.com/SolanaRemix/code-audit/actions/workflows/codeaudit-self-test.yml)

## 🙏 Acknowledgments

- Built with [Probot](https://probot.github.io/)
- Inspired by the GitHub security and code quality community

---

Made with ❤️ by the CodeAudit.sh team

