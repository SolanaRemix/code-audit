# Code Examples for Audit System

This directory contains examples demonstrating the CyberAi.network automated audit system.

## 📁 Files

### `secure_code_example.py`
✅ **Good Example** - Demonstrates secure coding practices that pass audits:
- Password hashing with PBKDF2 and salt
- Input validation and sanitization
- Secure random token generation
- No hardcoded secrets
- Constant-time comparison to prevent timing attacks

**Run it:**
```bash
python3 examples/secure_code_example.py
```

### `insecure_code_example.py`
❌ **Bad Example** - Shows security vulnerabilities that would be flagged:
- Plain text password storage
- Weak MD5 hashing without salt
- SQL injection vulnerabilities
- Cross-site scripting (XSS) risks
- Weak random number generation
- Hardcoded credentials

**Run it (for learning only):**
```bash
python3 examples/insecure_code_example.py
```

⚠️ **Warning:** `insecure_code_example.py` contains intentional vulnerabilities for educational purposes. Never use this code in production!

## 🎯 What The Audit System Checks

### Security Vulnerabilities
- **SQL Injection**: Unsafe database queries
- **XSS (Cross-Site Scripting)**: Unsanitized output
- **Command Injection**: Unsafe system calls
- **Path Traversal**: Insecure file operations
- **Code Injection**: Use of `eval()` or `exec()` with user input

### Cryptographic Issues
- **Weak Hashing**: MD5, SHA1 instead of SHA-256+
- **Missing Salt**: Password hashing without salt
- **Weak Random**: Using `random` instead of `secrets`
- **Hardcoded Secrets**: Credentials in source code

### Best Practices
- **Input Validation**: All user input checked
- **Error Handling**: Proper exception management
- **Logging**: No sensitive data in logs
- **Type Safety**: Proper type hints (Python)

## 📊 Audit Results Comparison

| Issue | Insecure Example | Secure Example |
|-------|-----------------|----------------|
| Password Storage | ❌ Plain text | ✅ PBKDF2 with salt |
| Hashing Algorithm | ❌ MD5 | ✅ SHA-256 |
| Input Validation | ❌ None | ✅ Comprehensive |
| Random Generation | ❌ `random` module | ✅ `secrets` module |
| SQL Queries | ❌ String formatting | ✅ Parameterized |
| Timing Attacks | ❌ Vulnerable | ✅ Protected |
| Hardcoded Secrets | ❌ Present | ✅ None |

## 🔍 How to Use These Examples

### For Learning
1. Review `secure_code_example.py` to understand best practices
2. Study `insecure_code_example.py` to recognize vulnerabilities
3. Compare the two to see the differences

### For Testing the Audit System
1. Create a PR with `secure_code_example.py` → Should pass ✅
2. Create a PR with `insecure_code_example.py` → Should flag issues ❌
3. Review the audit report to see what was detected

### For Your Own Code
Use these patterns:

```python
# ❌ BAD - Vulnerable to SQL Injection
query = f"SELECT * FROM users WHERE id = {user_id}"

# ✅ GOOD - Use parameterized queries
query = "SELECT * FROM users WHERE id = ?"
cursor.execute(query, (user_id,))
```

```python
# ❌ BAD - Weak hashing
import hashlib
password_hash = hashlib.md5(password.encode()).hexdigest()

# ✅ GOOD - Strong hashing with salt
import hashlib
import secrets
salt = secrets.token_bytes(32)
password_hash = hashlib.pbkdf2_hmac('sha256', password.encode(), salt, 100000)
```

```python
# ❌ BAD - Insecure random
import random
token = random.randint(1000, 9999)

# ✅ GOOD - Cryptographically secure
import secrets
token = secrets.token_hex(32)
```

```python
# ❌ BAD - XSS vulnerability
html = f"<div>{user_input}</div>"

# ✅ GOOD - Sanitize input
import html
safe_html = f"<div>{html.escape(user_input)}</div>"
```

## 🛡️ Security Checklist

Before committing code, verify:

- [ ] No hardcoded credentials or secrets
- [ ] All user input is validated and sanitized
- [ ] Strong cryptographic algorithms (SHA-256+, not MD5/SHA1)
- [ ] Secure random generation (`secrets`, not `random`)
- [ ] Parameterized database queries
- [ ] Proper error handling
- [ ] No sensitive data in logs
- [ ] Input length limits enforced
- [ ] Output is properly escaped/sanitized

## 📚 Additional Resources

### Python Security
- [Python Security Best Practices](https://python.readthedocs.io/en/stable/library/security_warnings.html)
- [OWASP Python Security](https://owasp.org/www-project-python-security/)

### General Security
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE Top 25](https://cwe.mitre.org/top25/)
- [SANS Top 25](https://www.sans.org/top25-software-errors/)

### Tools
- [Bandit - Python Security Linter](https://github.com/PyCQA/bandit)
- [Safety - Dependency Scanner](https://github.com/pyupio/safety)
- [CodeQL - Semantic Analysis](https://codeql.github.com/)

## 🤝 Contributing Examples

Want to add more examples? Please:

1. Create both secure and insecure versions
2. Add clear comments explaining the issues
3. Include test output
4. Update this README
5. Submit a PR (audit will run automatically!)

---

**Remember:** The goal is to write secure code from the start, not just to pass audits!
