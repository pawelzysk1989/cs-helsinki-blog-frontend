import axios, { AxiosError } from 'axios';

export type ServerError = AxiosError<{
  error: string;
}>;

export const isServerError = (error: unknown): error is ServerError =>
  axios.isAxiosError(error) && 'error' in error.response?.data;
