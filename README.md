# CodeAudit.sh 🔍

> Automated code audit GitHub App built with [Probot](https://probot.github.io)

CodeAudit.sh is a powerful GitHub App that automatically audits your pull requests for security vulnerabilities, code quality issues, and best practices violations. It integrates seamlessly with your workflow and provides actionable feedback directly in your PRs.

## Features ✨

- 🔒 **Security Scanning**: Detects security vulnerabilities and potential exploits
- 📊 **Code Quality**: Analyzes code for quality issues and anti-patterns
- 🎯 **Multi-Language Support**: Works with JavaScript, TypeScript, Python, Go, Rust, Java, and more
- 🤖 **Automated Workflow**: Runs automatically on pull requests
- 💬 **In-PR Comments**: Posts audit results directly in pull request comments
- 🏷️ **Smart Labels**: Automatically adds labels based on audit severity
- ⚙️ **Configurable**: Customize audit rules and thresholds per repository
- 🚀 **Easy Setup**: Simple installation and configuration

## Supported Tools 🛠️

CodeAudit.sh integrates with industry-standard audit tools:

- **ESLint** - JavaScript/TypeScript linting
- **Prettier** - Code formatting checks
- **ShellCheck** - Shell script analysis
- **Bandit** - Python security linting
- **Semgrep** - Pattern-based code analysis
- **And more...**

## Installation 📦

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- A GitHub account

### Option 1: Install the GitHub App (Recommended)

1. Visit the [CodeAudit.sh GitHub App page](https://github.com/apps/codeaudit-sh)
2. Click "Install"
3. Select repositories to enable
4. Configure with `.codeaudit.yml` in your repositories

### Option 2: Self-Host

1. Clone this repository:
   ```bash
   git clone https://github.com/SolanaRemix/code-audit.git
   cd code-audit
   ```

2. Install dependencies:
   ```bash
   npm install
   # or use the install script
   bash scripts/install.sh
   ```

3. Create a GitHub App:
   - Go to [GitHub Developer Settings](https://github.com/settings/apps)
   - Create a new GitHub App
   - Set webhook URL and generate webhook secret
   - Download the private key

4. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your GitHub App credentials
   ```

5. Start the app:
   ```bash
   npm start
   # or for development
   npm run dev
   ```

## Configuration ⚙️

Create a `.codeaudit.yml` file in the root of your repository:

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

See [.codeaudit.example.yml](.codeaudit.example.yml) for full configuration options.

## Usage 🚀

Once installed, CodeAudit.sh automatically:

1. **Monitors Pull Requests**: Listens for new and updated PRs
2. **Runs Audits**: Executes configured audit tools on changed code
3. **Reports Results**: Posts comprehensive audit reports as PR comments
4. **Applies Labels**: Adds severity labels based on findings
5. **Blocks Merges**: Optionally blocks PRs with critical issues

## Development 💻

### Setup Development Environment

```bash
# Clone the repository
git clone https://github.com/SolanaRemix/code-audit.git
cd code-audit

# Install dependencies
npm install

# Setup development environment
npm run setup

# Start development server with hot reload
npm run dev
```

### Project Structure

```
code-audit/
├── app.js                  # Main application entry point
├── package.json            # Node.js dependencies
├── src/
│   ├── config.js          # Configuration loader
│   ├── logger.js          # Logging utility
│   ├── githubApp.js       # GitHub App integration
│   ├── auditRunner.js     # Main audit orchestration
│   ├── analyzers/         # Code analyzers
│   └── reporting/         # Report generation
├── scripts/               # Utility scripts
├── .github/workflows/     # CI/CD workflows
└── docs/                  # Documentation
```

### Running Tests

```bash
npm test
```

### Linting

```bash
npm run lint
npm run lint:fix
```

## Deployment 🚢

### Deploy to Vercel

```bash
npm run deploy
```

### Deploy to Other Platforms

CodeAudit.sh can be deployed to:
- Heroku
- AWS Lambda
- Google Cloud Functions
- Azure Functions
- Your own server

See our [deployment guide](docs/deployment.md) for detailed instructions.

## Scripts 📜

The `scripts/` directory contains utility scripts:

- `setup.sh` - Initial setup and configuration
- `install.sh` - Install dependencies and tools
- `deploy.sh` - Deploy the application
- `ui.sh` - UI management utilities
- `db.sh` - Database operations
- `updates.sh` - Update management
- `api.sh` - API utilities
- `config.sh` - Configuration management
- `network.sh` - Network utilities

## Contributing 🤝

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## Code of Conduct 📜

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

## Support 💖

- ⭐ Star this repository
- 🐛 [Report bugs](https://github.com/SolanaRemix/code-audit/issues)
- 💡 [Request features](https://github.com/SolanaRemix/code-audit/issues)
- 💬 [Join discussions](https://github.com/SolanaRemix/code-audit/discussions)

## Sponsors 💝

Support this project by becoming a sponsor. See [SPONSORS.md](SPONSORS.md) for details.

## License 📄

MIT © CodeAudit.sh Team - See [LICENSE](LICENSE) for details.

## Links 🔗

- [Documentation](https://solanaremix.github.io/code-audit/)
- [GitHub App](https://github.com/apps/codeaudit-sh)
- [Issues](https://github.com/SolanaRemix/code-audit/issues)
- [Discussions](https://github.com/SolanaRemix/code-audit/discussions)

---

Made with ❤️ by the CodeAudit.sh Team
