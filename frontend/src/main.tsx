import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'

// Start MSW if in mock mode
if (import.meta.env.VITE_MOCK_MODE === 'true') {
  const { startMockWorker } = await import('./api/mock/browser');
  await startMockWorker();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
