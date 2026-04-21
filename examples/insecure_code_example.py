"""
Example: Insecure Code That Would FAIL Audit

⚠️ WARNING: This file contains INTENTIONAL security vulnerabilities
for demonstration purposes. DO NOT use this code in production!

This demonstrates what NOT to do. The automated audit system
would flag these issues.
"""

import hashlib


class InsecureUserAuth:
    """Example of INSECURE authentication - DO NOT USE!"""
    
    def __init__(self):
        self.users = {}
        # VULNERABILITY: Hardcoded credentials
        self.admin_password = "admin123"  # Would be flagged by audit
    
    def hash_password(self, password):
        """
        INSECURE: Uses MD5 without salt
        Audit would flag: Weak hashing algorithm
        """
        # MD5 is cryptographically broken
        return hashlib.md5(password.encode()).hexdigest()
    
    def create_user(self, username, password):
        """
        INSECURE: Multiple security issues
        """
        # VULNERABILITY: No input validation
        # VULNERABILITY: Stores password in plain text
        self.users[username] = password  # Storing plain text password!
        return True
    
    def verify_user(self, username, password):
        """
        INSECURE: Timing attack vulnerability
        """
        if username not in self.users:
            return False
        
        # VULNERABILITY: Not constant-time comparison
        return self.users[username] == password
    
    def execute_query(self, user_input):
        """
        CRITICAL VULNERABILITY: SQL Injection
        Audit would flag: Unsafe query construction
        """
        # NEVER DO THIS! SQL Injection vulnerability
        query = f"SELECT * FROM users WHERE name = '{user_input}'"
        # Attacker could input: ' OR '1'='1
        return query
    
    def render_html(self, user_content):
        """
        CRITICAL VULNERABILITY: Cross-Site Scripting (XSS)
        Audit would flag: Unsanitized user input
        """
        # NEVER DO THIS! XSS vulnerability
        html = f"<div>{user_content}</div>"
        # Attacker could inject: <script>alert('XSS')</script>
        return html


def unsafe_file_operation(filename):
    """
    VULNERABILITY: Path traversal attack
    Audit would flag: Unsafe file path handling
    """
    # Attacker could input: ../../etc/passwd
    with open(f"/data/{filename}", 'r') as f:
        return f.read()


def unsafe_eval(user_code):
    """
    CRITICAL VULNERABILITY: Code injection
    Audit would flag: Use of eval with user input
    """
    # NEVER DO THIS! Remote code execution vulnerability
    return eval(user_code)  # Extremely dangerous!


def generate_weak_token():
    """
    VULNERABILITY: Weak random number generation
    Audit would flag: Insecure randomness
    """
    import random
    # random module is NOT cryptographically secure
    return random.randint(1000, 9999)


# Example of what would be flagged
if __name__ == '__main__':
    print("⚠️  This code demonstrates security vulnerabilities!")
    print("These would be flagged by the automated audit:\n")
    
    auth = InsecureUserAuth()
    
    # Issue 1: Plain text password storage
    auth.create_user('bob', 'password123')
    print("❌ Storing plain text password")
    
    # Issue 2: Weak hashing
    weak_hash = auth.hash_password('test')
    print(f"❌ Weak MD5 hash: {weak_hash}")
    
    # Issue 3: SQL Injection
    malicious_input = "admin' OR '1'='1"
    query = auth.execute_query(malicious_input)
    print(f"❌ SQL Injection vulnerability: {query}")
    
    # Issue 4: XSS
    malicious_html = "<script>alert('XSS')</script>"
    output = auth.render_html(malicious_html)
    print(f"❌ XSS vulnerability: {output}")
    
    # Issue 5: Weak random
    token = generate_weak_token()
    print(f"❌ Weak random token: {token}")
    
    print("\n⚠️  All of these issues would be caught by the audit system!")
    print("✅ Use examples/secure_code_example.py instead!")
