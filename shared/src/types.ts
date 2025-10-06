/**
 * UFDR Copilot Shared Types
 * Common type definitions used across frontend and backend
 */

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message: string;
  timestamp?: string;
}

export interface HealthResponse {
  status: string;
  message: string;
  version: string;
}

// User Types
export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  ADMIN = 'admin',
  ANALYST = 'analyst',
  VIEWER = 'viewer'
}

// Authentication Types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
  expiresIn: number;
}

// Forensic Analysis Types
export interface ForensicCase {
  id: string;
  name: string;
  description: string;
  status: CaseStatus;
  createdBy: string;
  assignedTo: string[];
  createdAt: string;
  updatedAt: string;
  evidence: Evidence[];
}

export enum CaseStatus {
  OPEN = 'open',
  IN_PROGRESS = 'in_progress',
  UNDER_REVIEW = 'under_review',
  CLOSED = 'closed',
  ARCHIVED = 'archived'
}

export interface Evidence {
  id: string;
  caseId: string;
  name: string;
  type: EvidenceType;
  filePath: string;
  fileSize: number;
  hash: string;
  uploadedBy: string;
  uploadedAt: string;
  metadata: Record<string, any>;
}

export enum EvidenceType {
  DISK_IMAGE = 'disk_image',
  MEMORY_DUMP = 'memory_dump',
  NETWORK_CAPTURE = 'network_capture',
  LOG_FILE = 'log_file',
  DOCUMENT = 'document',
  OTHER = 'other'
}

// Analysis Types
export interface AnalysisJob {
  id: string;
  caseId: string;
  evidenceId: string;
  type: AnalysisType;
  status: JobStatus;
  progress: number;
  startedAt: string;
  completedAt?: string;
  results?: AnalysisResult;
  error?: string;
}

export enum AnalysisType {
  FILE_RECOVERY = 'file_recovery',
  HASH_ANALYSIS = 'hash_analysis',
  METADATA_EXTRACTION = 'metadata_extraction',
  KEYWORD_SEARCH = 'keyword_search',
  TIMELINE_ANALYSIS = 'timeline_analysis',
  NETWORK_ANALYSIS = 'network_analysis'
}

export enum JobStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

export interface AnalysisResult {
  summary: string;
  findings: Finding[];
  artifacts: Artifact[];
  metadata: Record<string, any>;
}

export interface Finding {
  id: string;
  type: string;
  severity: FindingSeverity;
  title: string;
  description: string;
  location: string;
  timestamp?: string;
  confidence: number;
}

export enum FindingSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

export interface Artifact {
  id: string;
  name: string;
  type: string;
  path: string;
  size: number;
  hash: string;
  extracted: boolean;
}

// Report Types
export interface Report {
  id: string;
  caseId: string;
  title: string;
  type: ReportType;
  status: ReportStatus;
  generatedBy: string;
  generatedAt: string;
  content: ReportContent;
}

export enum ReportType {
  EXECUTIVE_SUMMARY = 'executive_summary',
  TECHNICAL_ANALYSIS = 'technical_analysis',
  TIMELINE_REPORT = 'timeline_report',
  EVIDENCE_SUMMARY = 'evidence_summary'
}

export enum ReportStatus {
  DRAFT = 'draft',
  REVIEW = 'review',
  FINAL = 'final'
}

export interface ReportContent {
  sections: ReportSection[];
  attachments: string[];
  metadata: Record<string, any>;
}

export interface ReportSection {
  id: string;
  title: string;
  content: string;
  order: number;
  type: SectionType;
}

export enum SectionType {
  TEXT = 'text',
  TABLE = 'table',
  CHART = 'chart',
  IMAGE = 'image',
  CODE = 'code'
}
