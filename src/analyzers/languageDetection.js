/**
 * Language Detection
 * Detects programming languages from file extensions
 */

const path = require('path');
const logger = require('../logger');

// Language mapping by file extension
const LANGUAGE_MAP = {
  '.js': 'javascript',
  '.jsx': 'javascript',
  '.mjs': 'javascript',
  '.cjs': 'javascript',
  '.ts': 'typescript',
  '.tsx': 'typescript',
  '.py': 'python',
  '.pyw': 'python',
  '.go': 'go',
  '.rs': 'rust',
  '.java': 'java',
  '.kt': 'kotlin',
  '.kts': 'kotlin',
  '.rb': 'ruby',
  '.php': 'php',
  '.c': 'c',
  '.h': 'c',
  '.cpp': 'cpp',
  '.cc': 'cpp',
  '.cxx': 'cpp',
  '.hpp': 'cpp',
  '.cs': 'csharp',
  '.swift': 'swift',
  '.m': 'objectivec',
  '.scala': 'scala',
  '.sh': 'shell',
  '.bash': 'shell',
  '.zsh': 'shell',
  '.pl': 'perl',
  '.r': 'r',
  '.R': 'r',
  '.lua': 'lua',
  '.vim': 'vim',
  '.sql': 'sql',
  '.yaml': 'yaml',
  '.yml': 'yaml',
  '.json': 'json',
  '.xml': 'xml',
  '.html': 'html',
  '.css': 'css',
  '.scss': 'scss',
  '.sass': 'sass',
  '.less': 'less'
};

/**
 * Detect languages from file list
 * @param {Array<Object>} files - Array of file objects with filename property
 * @returns {Array<string>} Array of unique detected languages
 */
function detectLanguages(files) {
  const languageSet = new Set();

  files.forEach(file => {
    const lang = detectLanguageFromFile(file.filename);
    if (lang) {
      languageSet.add(lang);
    }
  });

  const languages = Array.from(languageSet);
  logger.debug(`Detected ${languages.length} unique languages`, { languages });
  
  return languages;
}

/**
 * Detect language from a single file
 * @param {string} filename - File name or path
 * @returns {string|null} Detected language or null
 */
function detectLanguageFromFile(filename) {
  const ext = path.extname(filename).toLowerCase();
  const language = LANGUAGE_MAP[ext];
  
  if (!language) {
    logger.debug(`Unknown file extension: ${ext} for file: ${filename}`);
    return null;
  }
  
  return language;
}

/**
 * Get file extension for a language
 * @param {string} language - Language name
 * @returns {Array<string>} Array of extensions for the language
 */
function getExtensionsForLanguage(language) {
  return Object.entries(LANGUAGE_MAP)
    .filter(([, lang]) => lang === language)
    .map(([ext]) => ext);
}

/**
 * Check if a file is of a specific language
 * @param {string} filename - File name or path
 * @param {string} language - Language to check
 * @returns {boolean} True if file is of the specified language
 */
function isLanguage(filename, language) {
  return detectLanguageFromFile(filename) === language;
}

module.exports = {
  detectLanguages,
  detectLanguageFromFile,
  getExtensionsForLanguage,
  isLanguage,
  LANGUAGE_MAP
};
