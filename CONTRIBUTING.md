# Contributing to CyberAi.network Code Audit System

Thank you for your interest in contributing! This document explains how to work with the automated audit system.

## 🔄 Audit Workflow for Contributors

When you submit a pull request, the automated audit system will:

1. **Run Security Scans**: CodeQL analyzes your code for vulnerabilities
2. **Generate Certificate**: A unique audit certificate is created
3. **Apply Labels**: Your PR receives status labels
4. **Post Results**: An audit summary comment appears on your PR

## ✅ Audit Requirements

For your PR to pass the audit:

- No critical or high-severity security vulnerabilities
- Code quality standards met
- Best practices followed
- All automated checks pass

## 🏷️ Understanding Labels

| Label | Meaning | Action Required |
|-------|---------|-----------------|
| `audit:passed` | ✅ All checks passed | None - ready for review |
| `audit:failed` | ❌ Issues found | Fix identified issues |
| `audit:pending` | ⏳ Audit in progress | Wait for completion |
| `security:verified` | ✅ Security OK | None |
| `security:needs-review` | ⚠️ Security concerns | Address security issues |

## 🔧 Running Audits Locally

While automated audits run on the server, you can run basic checks locally:

### Python Code
```bash
# Install dependencies
pip install pylint bandit safety

# Run linting
pylint your_file.py

# Security check
bandit -r .

# Dependency check
safety check
```

### JavaScript/Node.js
```bash
# Install dependencies
npm install eslint

# Run linting
npx eslint .

# Security audit
npm audit
```

## 🐛 If Your Audit Fails

1. **Read the Audit Report**: Check the PR comment for details
2. **View Full Logs**: Go to Actions tab → Click on failed workflow
3. **Fix Issues**: Address identified problems
4. **Push Changes**: Audit runs automatically on new commits
5. **Request Help**: Comment on PR if you need assistance

## 📝 Code Guidelines

To pass audits consistently:

### Security Best Practices
- Validate all user inputs
- Use parameterized queries (no SQL injection)
- Avoid hardcoded secrets or credentials
- Implement proper error handling
- Use secure dependencies (no known vulnerabilities)

### Code Quality
- Follow language-specific style guides
- Write clear, maintainable code
- Add comments for complex logic
- Keep functions small and focused
- Use meaningful variable names

### Testing
- Include tests for new features
- Ensure tests pass locally before pushing
- Add security-focused test cases
- Test edge cases and error conditions

## 🔐 Security-Sensitive Changes

If your PR involves security-sensitive code:

1. **Request Manual Review**: Use the manual audit request template
2. **Document Security Considerations**: Explain your approach
3. **Add Tests**: Include security-focused tests
4. **Wait for Approval**: Security changes require thorough review

## 📊 Viewing Your Certificate

After audit completion:

1. Go to the Actions tab
2. Click on your workflow run
3. Download the audit certificate artifact
4. Review the detailed report

## 🚀 Triggering Manual Audits

To manually trigger an audit:

```bash
# Via GitHub CLI
gh workflow run code-audit.yml

# Or use the GitHub UI
Actions → Automated Code Audit → Run workflow
```

## 🤝 Development Workflow

```bash
# 1. Fork and clone
git clone https://github.com/YOUR_USERNAME/code-audit.git
cd code-audit

# 2. Create feature branch
git checkout -b feature/your-feature

# 3. Make changes
# ... edit files ...

# 4. Commit changes
git add .
git commit -m "Description of changes"

# 5. Push to your fork
git push origin feature/your-feature

# 6. Create PR
# Audit runs automatically

# 7. Address any audit issues
# ... fix problems ...
git commit -am "Fix audit issues"
git push

# 8. Wait for approval
# Audit passes → PR reviewed → Merged
```

## 📚 Additional Resources

- [GitHub CodeQL Documentation](https://codeql.github.com/docs/)
- [Security Best Practices](https://docs.github.com/en/code-security)
- [CI/CD with GitHub Actions](https://docs.github.com/en/actions)

## 💬 Getting Help

- **Audit Questions**: Comment on your PR
- **Bug Reports**: Open an issue
- **Security Concerns**: Use security advisories (not public issues)

## 🎯 Contribution Types

We welcome:

- **Bug Fixes**: Improvements to audit system
- **New Features**: Enhanced scanning capabilities
- **Documentation**: Better guides and examples
- **Test Cases**: Additional security tests
- **Performance**: Optimization improvements

## ✨ Recognition

Contributors who help improve the audit system will be recognized in:
- Release notes
- CONTRIBUTORS.md file
- GitHub insights

---

**Remember**: All contributions go through the same audit process. This ensures consistent security and quality across the entire codebase.

Thank you for contributing to CyberAi.network! 🚀
