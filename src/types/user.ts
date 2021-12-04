export interface User {
  id: string;
  username: string;
  name?: string;
  token: string;
}

export interface LoginFormState {
  username: string;
  password: string;
}
