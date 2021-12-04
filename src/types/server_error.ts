import axios, { AxiosError } from 'axios';

export type ServerError = AxiosError<{
  error: string;
}>;

export const isServerError = (error: Error): error is ServerError =>
  axios.isAxiosError(error) && 'error' in error.response?.data;
