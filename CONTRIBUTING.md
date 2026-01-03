# Contributing to CodeAudit.sh

Thank you for your interest in contributing to CodeAudit.sh! We welcome contributions from everyone.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues to avoid duplicates. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Screenshots** (if applicable)
- **Environment details** (OS, Node.js version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description**
- **Use case and motivation**
- **Potential implementation approach**
- **Alternative solutions considered**

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Add/update tests** as needed
5. **Ensure tests pass** (`npm test`)
6. **Lint your code** (`npm run lint`)
7. **Commit your changes** (follow commit message guidelines below)
8. **Push to your fork** (`git push origin feature/amazing-feature`)
9. **Open a Pull Request**

## Development Setup

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/code-audit.git
cd code-audit

# Add upstream remote
git remote add upstream https://github.com/SolanaRemix/code-audit.git

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```

## Coding Standards

### JavaScript/Node.js Style

- Use **ES6+** syntax
- Follow **ESLint** configuration
- Use **async/await** over callbacks
- Write **clear, descriptive variable names**
- Add **JSDoc comments** for functions
- Keep functions **small and focused**

### Example:

```javascript
/**
 * Analyze code for security vulnerabilities
 * @param {Object} context - Probot context
 * @param {Object} config - Audit configuration
 * @returns {Promise<Object>} Audit results
 */
async function runSecurityAudit(context, config) {
  // Implementation
}
```

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
type(scope): subject

body

footer
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(analyzer): add support for Rust language detection
fix(reporter): correct severity level calculation
docs(readme): update installation instructions
```

### Testing

- Write tests for new features
- Update tests for bug fixes
- Ensure all tests pass before submitting PR
- Aim for high code coverage

```bash
# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

## Project Structure

Understanding the project structure helps you contribute effectively:

```
src/
├── config.js          - Configuration management
├── logger.js          - Logging utility
├── githubApp.js       - GitHub App setup
├── auditRunner.js     - Main audit orchestration
├── analyzers/         - Language detection and tool execution
│   ├── index.js
│   ├── languageDetection.js
│   ├── toolRegistry.js
│   └── executors.js
└── reporting/         - Report generation
    ├── summaryBuilder.js
    └── commentFormatter.js
```

## Adding New Audit Tools

To add support for a new audit tool:

1. **Update tool registry** (`src/analyzers/toolRegistry.js`)
2. **Add executor** in `src/analyzers/executors.js`
3. **Update language detection** if needed
4. **Add configuration options** to `.codeaudit.example.yml`
5. **Write tests** for the new tool
6. **Update documentation**

Example:

```javascript
// In toolRegistry.js
const tools = {
  myNewTool: {
    name: 'MyNewTool',
    languages: ['python'],
    command: 'mynewtool',
    description: 'Description of the tool'
  }
};

// In executors.js
async function executeMyNewTool(files, config) {
  // Implementation
}
```

## Documentation

- Update **README.md** for user-facing changes
- Update **inline documentation** for code changes
- Add **examples** where appropriate
- Keep documentation **clear and concise**

## Questions?

- Open a [Discussion](https://github.com/SolanaRemix/code-audit/discussions)
- Join our community chat (link coming soon)
- Email: support@codeaudit.sh (coming soon)

## Recognition

Contributors will be recognized in:
- GitHub contributors page
- Release notes
- Project documentation

Thank you for contributing to CodeAudit.sh! 🎉
