import axios from 'axios';

axios.interceptors.response.use(null, (err) => {
  const expectedErrors = err.response && err.response.status >= 400 && err.response.status < 500;

  // Handle only unexpected errors
  if (!expectedErrors) {
    console.log(err, 'An unexpected err occurred.');
  }

  return Promise.reject(err);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
