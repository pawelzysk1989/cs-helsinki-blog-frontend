import axios from 'axios';

import { isResponseError } from '../types/server_error';

const extractMessage = (error: unknown): string => {
  if (isResponseError(error)) {
    return error.response?.data.error ?? error.message;
  }
  if (axios.isAxiosError(error)) {
    return error.message;
  }
  return JSON.stringify(error);
};

export default { extractMessage };
