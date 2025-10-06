/**
 * UFDR Copilot Shared Constants
 * Common constants used across frontend and backend
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.API_URL || 'http://localhost:8000',
  VERSION: 'v1',
  TIMEOUT: 30000,
  RETRY_ATTEMPTS: 3,
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  // Health & Status
  HEALTH: '/health',
  STATUS: '/api/v1/status',
  
  // Authentication
  LOGIN: '/api/v1/auth/login',
  LOGOUT: '/api/v1/auth/logout',
  REFRESH: '/api/v1/auth/refresh',
  PROFILE: '/api/v1/auth/profile',
  
  // Users
  USERS: '/api/v1/users',
  USER_BY_ID: (id: string) => `/api/v1/users/${id}`,
  
  // Cases
  CASES: '/api/v1/cases',
  CASE_BY_ID: (id: string) => `/api/v1/cases/${id}`,
  CASE_EVIDENCE: (id: string) => `/api/v1/cases/${id}/evidence`,
  
  // Evidence
  EVIDENCE: '/api/v1/evidence',
  EVIDENCE_BY_ID: (id: string) => `/api/v1/evidence/${id}`,
  EVIDENCE_UPLOAD: '/api/v1/evidence/upload',
  EVIDENCE_DOWNLOAD: (id: string) => `/api/v1/evidence/${id}/download`,
  
  // Analysis
  ANALYSIS_JOBS: '/api/v1/analysis/jobs',
  ANALYSIS_JOB_BY_ID: (id: string) => `/api/v1/analysis/jobs/${id}`,
  START_ANALYSIS: '/api/v1/analysis/start',
  CANCEL_ANALYSIS: (id: string) => `/api/v1/analysis/jobs/${id}/cancel`,
  
  // Reports
  REPORTS: '/api/v1/reports',
  REPORT_BY_ID: (id: string) => `/api/v1/reports/${id}`,
  GENERATE_REPORT: '/api/v1/reports/generate',
  EXPORT_REPORT: (id: string) => `/api/v1/reports/${id}/export`,
} as const;

// File Upload Configuration
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 10 * 1024 * 1024 * 1024, // 10GB
  ALLOWED_TYPES: [
    'application/octet-stream',
    'application/x-disk-image',
    'application/x-raw-disk-image',
    'application/zip',
    'application/x-tar',
    'text/plain',
    'application/pdf',
    'image/*',
  ],
  CHUNK_SIZE: 1024 * 1024, // 1MB chunks
} as const;

// Analysis Configuration
export const ANALYSIS_CONFIG = {
  MAX_CONCURRENT_JOBS: 5,
  JOB_TIMEOUT: 3600000, // 1 hour in milliseconds
  PROGRESS_UPDATE_INTERVAL: 5000, // 5 seconds
  SUPPORTED_FORMATS: [
    'dd', 'raw', 'img', 'bin', 'e01', 'ex01', 'l01', 'lx01',
    'aff', 'afd', 'vmdk', 'vdi', 'vhd', 'qcow2',
  ],
} as const;

// Security Configuration
export const SECURITY_CONFIG = {
  JWT_EXPIRY: '24h',
  REFRESH_TOKEN_EXPIRY: '7d',
  PASSWORD_MIN_LENGTH: 8,
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_DURATION: 900000, // 15 minutes in milliseconds
  SESSION_TIMEOUT: 3600000, // 1 hour in milliseconds
} as const;

// UI Configuration
export const UI_CONFIG = {
  PAGINATION: {
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGE_SIZE: 100,
    PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
  },
  TOAST: {
    DEFAULT_DURATION: 5000,
    ERROR_DURATION: 10000,
    SUCCESS_DURATION: 3000,
  },
  THEME: {
    DEFAULT: 'dark',
    STORAGE_KEY: 'ufdr-theme',
  },
} as const;

// Database Configuration
export const DB_CONFIG = {
  CONNECTION_TIMEOUT: 30000,
  QUERY_TIMEOUT: 60000,
  MAX_CONNECTIONS: 20,
  BACKUP_INTERVAL: 3600000, // 1 hour
} as const;

// Logging Configuration
export const LOG_CONFIG = {
  LEVELS: {
    ERROR: 0,
    WARN: 1,
    INFO: 2,
    DEBUG: 3,
  },
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_FILES: 10,
  DATE_PATTERN: 'YYYY-MM-DD',
} as const;

// Validation Rules
export const VALIDATION_RULES = {
  USERNAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 50,
    PATTERN: /^[a-zA-Z0-9_-]+$/,
  },
  EMAIL: {
    PATTERN: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  CASE_NAME: {
    MIN_LENGTH: 3,
    MAX_LENGTH: 100,
  },
  EVIDENCE_NAME: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 255,
  },
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  // Authentication
  INVALID_CREDENTIALS: 'Invalid username or password',
  TOKEN_EXPIRED: 'Authentication token has expired',
  ACCESS_DENIED: 'Access denied',
  
  // Validation
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  PASSWORD_TOO_SHORT: `Password must be at least ${SECURITY_CONFIG.PASSWORD_MIN_LENGTH} characters`,
  
  // File Upload
  FILE_TOO_LARGE: `File size exceeds maximum limit of ${UPLOAD_CONFIG.MAX_FILE_SIZE / (1024 * 1024 * 1024)}GB`,
  INVALID_FILE_TYPE: 'File type not supported',
  UPLOAD_FAILED: 'File upload failed',
  
  // Analysis
  ANALYSIS_FAILED: 'Analysis job failed',
  UNSUPPORTED_FORMAT: 'File format not supported for analysis',
  
  // General
  NETWORK_ERROR: 'Network connection error',
  SERVER_ERROR: 'Internal server error',
  NOT_FOUND: 'Resource not found',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Successfully logged in',
  LOGOUT_SUCCESS: 'Successfully logged out',
  CASE_CREATED: 'Case created successfully',
  EVIDENCE_UPLOADED: 'Evidence uploaded successfully',
  ANALYSIS_STARTED: 'Analysis job started',
  REPORT_GENERATED: 'Report generated successfully',
} as const;
