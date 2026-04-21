# CodeAudit.sh Documentation

Welcome to **CodeAudit.sh** - the automated code audit GitHub App powered by Probot!

## 🚀 Quick Start

Get started with CodeAudit.sh in minutes:

```bash
# Clone the repository
git clone https://github.com/SolanaRemix/code-audit.git
cd code-audit

# Run the setup script
./scripts/setup.sh

# Configure your GitHub App credentials
# Edit .env and add:
# - APP_ID
# - PRIVATE_KEY
# - WEBHOOK_SECRET

# Start the app
npm start
```

## 📖 What is CodeAudit.sh?

CodeAudit.sh is a powerful GitHub App that automatically audits your code for:

- **Security vulnerabilities** - Detect common security issues before they reach production
- **Code quality issues** - Identify maintainability and reliability problems
- **Best practices violations** - Ensure your code follows industry standards
- **Style inconsistencies** - Keep your codebase clean and consistent

## ✨ Features

### 🔒 Multi-Language Support

CodeAudit.sh supports a wide range of programming languages:

- JavaScript / TypeScript
- Python
- Go
- Rust
- Java
- Ruby
- PHP
- C / C++
- C#
- And more!

### 🎯 Automated PR Reviews

CodeAudit.sh integrates seamlessly with your pull request workflow:

1. Open a pull request
2. CodeAudit.sh automatically analyzes your changes
3. Get instant feedback with detailed comments
4. Fix issues before merging

### ⚙️ Fully Customizable

Configure CodeAudit.sh to match your team's needs:

```yaml
# .codeaudit.yml
analyzers:
  security:
    enabled: true
    severity: error
  quality:
    enabled: true
    severity: warning
  style:
    enabled: true
    severity: info

thresholds:
  error: 0
  warning: 10
```

## 📚 Documentation

- [README](https://github.com/SolanaRemix/code-audit/blob/main/README.md) - Full README with installation instructions
- [Contributing Guide](https://github.com/SolanaRemix/code-audit/blob/main/CONTRIBUTING.md) - Learn how to contribute
- [Configuration](https://github.com/SolanaRemix/code-audit/blob/main/.codeaudit.example.yml) - Example configuration file

## 🔗 Links

- [GitHub Repository](https://github.com/SolanaRemix/code-audit)
- [Issues](https://github.com/SolanaRemix/code-audit/issues)
- [Pull Requests](https://github.com/SolanaRemix/code-audit/pulls)

## 🤝 Contributing

We welcome contributions! Check out our [Contributing Guide](https://github.com/SolanaRemix/code-audit/blob/main/CONTRIBUTING.md) to get started.

## 💖 Support

If you find CodeAudit.sh useful, consider:

- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 🤝 Contributing code
- 💰 Sponsoring the project

## 📝 License

CodeAudit.sh is released under the [MIT License](https://github.com/SolanaRemix/code-audit/blob/main/LICENSE).

---

**Built with ❤️ by the CodeAudit.sh team**

*Powered by [Probot](https://probot.github.io/)*
