import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import * as Sentry from '@sentry/react';
import config from '../config.json';

axios.interceptors.response.use(null, (err) => {
  const expectedErrors = err.response && err.response.status >= 400 && err.response.status < 500;

  // Handle only unexpected errors
  if (!expectedErrors) {
    Sentry.captureException(err);
    toast.error('An unexpected err occurred!', config.toastOptions);
  }

  return Promise.reject(err);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
