import { HealthResponse, QueryRequest, QueryResponse, EntitiesResponse, ReportRequest, ReportResponse } from './types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

const apiClient = {
  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }

    return response.json();
  },
};

export const getHealth = (): Promise<HealthResponse> => {
  return apiClient.request<HealthResponse>('/health');
};

export const query = (query: string, mode: string = 'natural'): Promise<QueryResponse> => {
  return apiClient.request<QueryResponse>('/query', {
    method: 'POST',
    body: JSON.stringify({ query, mode }),
  });
};

export const getEntities = (queryId?: string): Promise<Record<string, Array<{value: string, count: number}>>> => {
  const url = queryId ? `/entities?queryId=${queryId}` : '/entities';
  return apiClient.request<Record<string, Array<{value: string, count: number}>>>(url);
};

export const generateReport = (request: ReportRequest): Promise<ReportResponse> => {
  return apiClient.request<ReportResponse>('/report', {
    method: 'POST',
    body: JSON.stringify(request),
  });
};
