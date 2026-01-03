# Contributing to CodeAudit.sh

Thank you for your interest in contributing to CodeAudit.sh! This document provides guidelines and instructions for contributing to the project.

## 🤝 Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before contributing.

## 🚀 Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/code-audit.git
   cd code-audit
   ```
3. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```
5. **Set up your development environment**:
   ```bash
   cp .env.example .env
   # Configure your .env file with test app credentials
   ```

## 💻 Development Workflow

### Making Changes

1. Make your changes in your feature branch
2. Follow the existing code style and conventions
3. Add or update tests as needed
4. Update documentation if necessary
5. Ensure all tests pass: `npm test`
6. Lint your code: `npm run lint`

### Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat:` A new feature
- `fix:` A bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Example:
```
feat: add support for Rust static analysis
fix: resolve issue with Python analyzer timeout
docs: update installation instructions
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run linter
npm run lint

# Fix linting issues automatically
npm run lint:fix
```

### Local Development

For local development with webhook testing:

1. Set up a webhook proxy using [Smee.io](https://smee.io/)
2. Add the Smee channel URL to your `.env`:
   ```
   WEBHOOK_PROXY_URL=https://smee.io/your-channel
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 📋 Pull Request Process

1. **Update documentation**: Ensure README and other docs reflect your changes
2. **Update tests**: Add or update tests to cover your changes
3. **Run the test suite**: Ensure all tests pass
4. **Update CHANGELOG**: Add an entry describing your changes (if applicable)
5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Create a Pull Request** on GitHub with:
   - Clear description of the changes
   - Reference to related issues (if any)
   - Screenshots (if UI changes)
   - Test results

### PR Requirements

- [ ] Tests pass (`npm test`)
- [ ] Code is linted (`npm run lint`)
- [ ] Documentation is updated
- [ ] Commit messages follow conventions
- [ ] PR description is clear and complete

## 🐛 Reporting Bugs

When reporting bugs, please include:

1. **Description**: Clear description of the issue
2. **Steps to reproduce**: Detailed steps to reproduce the behavior
3. **Expected behavior**: What you expected to happen
4. **Actual behavior**: What actually happened
5. **Environment**:
   - OS and version
   - Node.js version
   - CodeAudit.sh version
6. **Logs**: Relevant log output (sanitize sensitive data)
7. **Screenshots**: If applicable

## 💡 Suggesting Features

We love feature suggestions! Please:

1. Check if the feature has already been suggested
2. Create a new issue with the `enhancement` label
3. Provide:
   - Clear description of the feature
   - Use cases and benefits
   - Proposed implementation (if you have ideas)
   - Examples from other tools (if applicable)

## 🎨 Code Style

We use ESLint to enforce code style. Key points:

- Use 2 spaces for indentation
- Use single quotes for strings
- Add semicolons at the end of statements
- Use async/await over promises when possible
- Write descriptive variable and function names
- Add JSDoc comments for functions

Example:
```javascript
/**
 * Run code audit on the given context
 * @param {Object} context - Probot context object
 * @param {Object} config - Audit configuration
 * @returns {Promise<Object>} Audit results
 */
async function runAudit(context, config) {
  // Implementation
}
```

## 🧪 Testing Guidelines

- Write unit tests for new functions
- Write integration tests for new features
- Aim for high code coverage
- Use descriptive test names
- Mock external dependencies

Example:
```javascript
describe('auditRunner', () => {
  describe('runAudit', () => {
    it('should return audit results for valid context', async () => {
      // Test implementation
    });

    it('should handle errors gracefully', async () => {
      // Test implementation
    });
  });
});
```

## 📚 Documentation

Good documentation is crucial. When contributing:

- Update README.md if adding features or changing behavior
- Add JSDoc comments to new functions
- Update configuration examples
- Add examples for new features
- Keep language clear and concise

## 🏷️ Issue Labels

- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Documentation improvements
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention needed
- `question`: Further information requested
- `wontfix`: This will not be worked on

## 📞 Getting Help

- **GitHub Discussions**: Ask questions and discuss ideas
- **GitHub Issues**: Report bugs and request features
- **Documentation**: Check our docs and README

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project credits

Thank you for contributing to CodeAudit.sh! 🎉
