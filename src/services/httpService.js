import axios from 'axios';
import { toast } from 'react-toastify';

axios.interceptors.response.use(null, (err) => {
  const expectedErrors = err.response && err.response.status >= 400 && err.response.status < 500;

  // Handle only unexpected errors
  if (!expectedErrors) {
    toast.error('An unexpected err occurred!', {
      position: 'bottom-left',
      theme: 'colored',
      autoClose: 5000,
      pauseOnHover: false,
      hideProgressBar: false,
    });
  }

  return Promise.reject(err);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
