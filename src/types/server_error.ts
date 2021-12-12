import axios, { AxiosError } from 'axios';

export type ResponseError = AxiosError<{
  error: string;
}>;

export const isResponseError = (error: unknown): error is ResponseError =>
  axios.isAxiosError(error) && 'error' in error.response?.data;
