import { http, HttpResponse } from 'msw';
import healthData from './data/health.json';

export const handlers = [
  // Health check endpoint
  http.get('/health', () => {
    return HttpResponse.json(healthData);
  }),

  // Query endpoint with mock response
  http.post('/query', async ({ request }) => {
    const body = await request.json() as any;
    const queryId = `q_mock_${Date.now()}`;
    
    // Mock results data
    const mockResults = [
      {
        id: "r1",
        sender: "+971501234567",
        receiver: "+447700900000",
        app: "WhatsApp",
        timestamp: "2025-01-15T14:23:00Z",
        text: "Payment to bitcoin wallet 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
        entities: [
          { type: "BTC", value: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa", risk: "high" }
        ]
      },
      {
        id: "r2",
        sender: "+971501234567",
        receiver: "+971509876543",
        app: "Telegram",
        timestamp: "2025-01-15T15:45:00Z",
        text: "Meeting at Dubai Mall tomorrow at 3pm",
        entities: [
          { type: "UAE_phone", value: "+971509876543", risk: "medium" }
        ]
      },
      {
        id: "r3",
        sender: "user@protonmail.com",
        receiver: "contact@example.com",
        app: "Email",
        timestamp: "2025-01-15T16:12:00Z",
        text: "Please send the documents to my secure email",
        entities: [
          { type: "ProtonMail", value: "user@protonmail.com", risk: "low" }
        ]
      }
    ];
    
    return HttpResponse.json({
      queryId,
      dsl: 'MOCK_DSL_QUERY',
      dataset: 'mock_device',
      results: mockResults,
      meta: { total: mockResults.length, took_ms: Math.floor(Math.random() * 100) + 50 },
      originalQuery: body.query || '',
      mode: body.mode || 'natural',
    });
  }),

  http.get('/entities', ({ request }) => {
    const url = new URL(request.url);
    const queryId = url.searchParams.get('queryId');
    
    // Mock entities data grouped by type
    const mockEntities = {
      "BTC": [
        { value: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa", count: 3 }
      ],
      "UAE_phone": [
        { value: "+971501234567", count: 5 },
        { value: "+971509876543", count: 2 }
      ],
      "ProtonMail": [
        { value: "user@protonmail.com", count: 2 }
      ]
    };
    
    return HttpResponse.json(mockEntities);
  }),

  http.post('/report', () => {
    return HttpResponse.json({ reportId: 'mock-report-123', status: 'generated' });
  }),
];
