import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers);

export const startMockWorker = () => {
  return worker.start({
    onUnhandledRequest: 'bypass',
  });
};
