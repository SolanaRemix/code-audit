/**
 * Language Detection
 * 
 * Detects programming languages from file extensions
 */

const path = require('path');
const logger = require('../logger');

/**
 * Language mappings from file extensions
 */
const LANGUAGE_MAP = {
  // JavaScript/TypeScript
  '.js': 'javascript',
  '.jsx': 'javascript',
  '.ts': 'typescript',
  '.tsx': 'typescript',
  '.mjs': 'javascript',
  '.cjs': 'javascript',
  
  // Python
  '.py': 'python',
  '.pyw': 'python',
  '.pyx': 'python',
  
  // Go
  '.go': 'go',
  
  // Rust
  '.rs': 'rust',
  
  // Java
  '.java': 'java',
  '.class': 'java',
  '.jar': 'java',
  
  // C/C++
  '.c': 'c',
  '.h': 'c',
  '.cpp': 'cpp',
  '.cc': 'cpp',
  '.cxx': 'cpp',
  '.hpp': 'cpp',
  
  // Ruby
  '.rb': 'ruby',
  '.erb': 'ruby',
  
  // PHP
  '.php': 'php',
  
  // Shell
  '.sh': 'shell',
  '.bash': 'shell',
  '.zsh': 'shell',
  
  // YAML
  '.yml': 'yaml',
  '.yaml': 'yaml',
  
  // JSON
  '.json': 'json',
  
  // HTML/CSS
  '.html': 'html',
  '.htm': 'html',
  '.css': 'css',
  '.scss': 'scss',
  '.sass': 'sass',
  
  // Markdown
  '.md': 'markdown',
  '.markdown': 'markdown',
  
  // SQL
  '.sql': 'sql',
  
  // Docker
  'Dockerfile': 'docker',
  '.dockerfile': 'docker'
};

/**
 * Detect languages from file list
 * @param {Array<Object>} files - List of files
 * @returns {Array<string>} List of detected languages
 */
function detectLanguages(files) {
  const languages = new Set();

  files.forEach(file => {
    const ext = path.extname(file.filename).toLowerCase();
    const basename = path.basename(file.filename);
    
    // Check extension mapping
    if (LANGUAGE_MAP[ext]) {
      languages.add(LANGUAGE_MAP[ext]);
    }
    
    // Check special filenames
    if (LANGUAGE_MAP[basename]) {
      languages.add(LANGUAGE_MAP[basename]);
    }
  });

  const detected = Array.from(languages);
  logger.debug(`Detected languages: ${detected.join(', ')}`);
  
  return detected;
}

/**
 * Get language for a specific file
 * @param {string} filename - File name
 * @returns {string|null} Language or null if not detected
 */
function getFileLanguage(filename) {
  const ext = path.extname(filename).toLowerCase();
  const basename = path.basename(filename);
  
  return LANGUAGE_MAP[ext] || LANGUAGE_MAP[basename] || null;
}

/**
 * Check if file is a specific language
 * @param {string} filename - File name
 * @param {string} language - Language to check
 * @returns {boolean} True if file is the specified language
 */
function isLanguage(filename, language) {
  return getFileLanguage(filename) === language;
}

module.exports = {
  detectLanguages,
  getFileLanguage,
  isLanguage,
  LANGUAGE_MAP
};
