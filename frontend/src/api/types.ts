export interface HealthResponse {
  status: string;
  version?: string;
}

export interface QueryRequest {
  query: string;
  filters?: Record<string, any>;
}

export interface QueryResponse {
  queryId: string;
  dsl: string;
  dataset: string;
  results: any[];
  meta: {
    total: number;
    took_ms: number;
  };
  originalQuery?: string;
  mode?: string;
}

export interface Entity {
  id: string;
  name: string;
  type: string;
  metadata?: Record<string, any>;
}

export interface EntitiesResponse {
  entities: Entity[];
}

export interface ReportRequest {
  type: string;
  parameters: Record<string, any>;
}

export interface ReportResponse {
  reportId: string;
  status: string;
}
