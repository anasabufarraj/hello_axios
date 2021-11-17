import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';

function init() {
  Sentry.init({
    dsn: 'https://912776ff1dbb4f54a317916e7f337b16@o1071144.ingest.sentry.io/6067889',
    integrations: [new Integrations.BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

function log(err) {
  Sentry.captureException(err);
}

export default {
  init,
  log,
};
