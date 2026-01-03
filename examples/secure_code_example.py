"""
Example: Secure Code That Passes Audit

This file demonstrates code that follows security best practices
and would pass the automated audit system.
"""

import hashlib
import secrets
from typing import Optional


class SecureUserAuth:
    """Example of secure authentication implementation"""
    
    def __init__(self):
        self.users = {}
        self.salt_length = 32
    
    def hash_password(self, password: str, salt: Optional[bytes] = None) -> tuple:
        """
        Securely hash a password using SHA-256 with salt
        
        Args:
            password: Plain text password
            salt: Optional salt bytes, generated if not provided
        
        Returns:
            Tuple of (hashed_password, salt)
        """
        if salt is None:
            salt = secrets.token_bytes(self.salt_length)
        
        # Use proper hashing with salt
        pwd_hash = hashlib.pbkdf2_hmac(
            'sha256',
            password.encode('utf-8'),
            salt,
            100000  # Iterations for security
        )
        
        return pwd_hash, salt
    
    def create_user(self, username: str, password: str) -> bool:
        """
        Create a new user with securely hashed password
        
        Args:
            username: Username for the new user
            password: Password in plain text
        
        Returns:
            True if user created successfully
        """
        # Input validation
        if not username or not password:
            raise ValueError("Username and password are required")
        
        if username in self.users:
            raise ValueError("User already exists")
        
        # Minimum password length
        if len(password) < 8:
            raise ValueError("Password must be at least 8 characters")
        
        # Hash password securely
        pwd_hash, salt = self.hash_password(password)
        
        # Store hashed password, never plain text
        self.users[username] = {
            'password_hash': pwd_hash,
            'salt': salt
        }
        
        return True
    
    def verify_user(self, username: str, password: str) -> bool:
        """
        Verify user credentials
        
        Args:
            username: Username to verify
            password: Password to verify
        
        Returns:
            True if credentials are valid
        """
        if username not in self.users:
            return False
        
        user_data = self.users[username]
        pwd_hash, _ = self.hash_password(password, user_data['salt'])
        
        # Constant-time comparison to prevent timing attacks
        return secrets.compare_digest(pwd_hash, user_data['password_hash'])


def sanitize_input(user_input: str) -> str:
    """
    Sanitize user input to prevent injection attacks
    
    Args:
        user_input: Raw user input
    
    Returns:
        Sanitized string safe for processing
    """
    import html
    # Use proper HTML escaping for web contexts
    sanitized = html.escape(user_input)
    
    return sanitized.strip()


def generate_secure_token() -> str:
    """
    Generate a cryptographically secure random token
    
    Returns:
        Secure random token as hex string
    """
    return secrets.token_hex(32)


# Example usage
if __name__ == '__main__':
    # This code demonstrates security best practices:
    # 1. Password hashing with salt
    # 2. Input validation
    # 3. No hardcoded secrets
    # 4. Secure random generation
    # 5. Sanitization of user input
    
    auth = SecureUserAuth()
    
    # Create a user
    try:
        auth.create_user('alice', 'SecureP@ssw0rd123')
        print("✅ User created successfully")
    except ValueError as e:
        print(f"❌ Error: {e}")
    
    # Verify credentials
    if auth.verify_user('alice', 'SecureP@ssw0rd123'):
        print("✅ Authentication successful")
    else:
        print("❌ Authentication failed")
    
    # Generate secure token
    token = generate_secure_token()
    print(f"🔐 Generated token: {token[:16]}...")
    
    # Sanitize input
    unsafe_input = "<script>alert('xss')</script>"
    safe_input = sanitize_input(unsafe_input)
    print(f"🛡️  Sanitized: '{safe_input}'")
